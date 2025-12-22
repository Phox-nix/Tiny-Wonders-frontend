import ArticleInsideView from '@/modules/news/view/ArticleInsideView';

const mockArticle = {
  title: 'Why Do We Get Déjà Vu?',
  content: `
    Déjà vu is one of the brain’s strangest tricks — that sudden feeling that you’ve already lived a moment that’s happening right now. It feels almost magical, but scientists think it’s actually your memory system doing a tiny glitch.
    Inside your brain, new experiences are constantly being compared to old ones. Normally, your mind can tell what’s new and what’s familiar. But sometimes, those signals get mixed for a split second. Your brain takes a brand-new moment and accidentally labels it as a memory.
    It’s like your mind hits “play” and “record” at the same time.
    Some researchers believe déjà vu happens when your brain recognizes the pattern of something — the layout of a room, someone’s gesture, a smell — before you consciously notice it. Your intuition  says “I’ve seen this,” and a moment later your awareness catches up, creating that weird double feeling. The cool part? 
    Déjà vu usually means your memory system is working really well. It’s your brain doing quick, detailed checks in the background… and occasionally tripping over its own speed.
    So next time it happens, don’t worry — your brain is just being a little too enthusiastic`,
  image: '/latestwander-2.svg',
};
type PageProps = {
  params: {
    slug: string;
  };
};

export default function ArticleInsidePage({ params }: PageProps) {
  const { slug: _slug } = params;

  return <ArticleInsideView {...mockArticle} />;
}
