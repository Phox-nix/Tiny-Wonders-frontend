'use client';

import { useEffect, useState, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import { getComments, createComment, deleteComment } from '@/services/news';
import { Comment } from '@/types/news';
import useAuthStore from '@/store/authStore';
import styles from './Comments.module.scss';

interface CommentsProps {
  articleId: string;
}

const Comments = ({ articleId }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const { isAuthenticated, user } = useAuthStore();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Fetch existing comments
    getComments(articleId)
      .then((res) => {
        setComments(res.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));

    // Set up SignalR connection
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_HUB_URL}/hubs/comments`, {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    // Listen for new comments
    connection.on('NewComment', (comment: Comment) => {
      setComments((prev) => [...prev, comment]);
    });

    // Listen for deleted comments
    connection.on('DeleteComment', (commentId: string) => {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    });

    // Start connection and join article group
    connection
      .start()
      .then(() => {
        connection.invoke('JoinArticle', articleId);
        setIsConnected(true);
      })
      .catch(console.error);

    connectionRef.current = connection;
    // Handle reconnection
    connection.onreconnected(() => setIsConnected(true));
    connection.onclose(() => setIsConnected(false));

    // Cleanup on unmount
    return () => {
      connection.invoke('LeaveArticle', articleId).finally(() => {
        connection.stop();
      });
    };
  }, [articleId]);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    try {
      await createComment(articleId, content);
      setContent('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment(articleId, commentId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.comments}>
      <h3 className={styles.title}>Comments {comments.length > 0 && `(${comments.length})`}</h3>

      {isLoading ? (
        <p className={styles.loading}>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className={styles.empty}>No comments yet. Be the first!</p>
      ) : (
        <div className={styles.list}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <div className={styles.commentHeader}>
                <span className={styles.author}>{comment.userName}</span>
                <span className={styles.date}>
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
                {isAuthenticated && user?.userId === comment.userId && (
                  <button onClick={() => handleDelete(comment.id)} className={styles.deleteButton}>
                    Delete
                  </button>
                )}
              </div>
              <p className={styles.content}>{comment.content}</p>
            </div>
          ))}
        </div>
      )}

      {isAuthenticated ? (
        <div className={styles.form}>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a comment..."
            className={styles.input}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && content.trim()) handleSubmit();
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={!content.trim() || !isConnected}
            className={styles.submitButton}>
            {!isConnected ? 'Connecting...' : 'Send'}
          </button>
        </div>
      ) : (
        <p className={styles.loginPrompt}>
          <a href="/login">Sign in</a> to leave a comment
        </p>
      )}
    </div>
  );
};

export default Comments;
