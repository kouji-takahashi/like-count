import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://xpwtdnjblorglfgwiqet.supabase.co',
  'REMOVED'
);

export function useLikes(pageId) {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchCount = async () => {
      const { data } = await supabase
        .from('likes')
        .select('count')
        .eq('page_id', pageId)
        .single();

      if (data) setCount(data.count);
    };
    fetchCount();
  }, [pageId]);

  const like = async () => {
    if (liked) return;

    const { data } = await supabase
      .from('likes')
      .select('count')
      .eq('page_id', pageId)
      .single();

    if (data) {
      await supabase
        .from('likes')
        .update({ count: data.count + 1 })
        .eq('page_id', pageId);
      setCount(data.count + 1);
    } else {
      await supabase
        .from('likes')
        .insert({ page_id: pageId, count: 1 });
      setCount(1);
    }
    setLiked(true);
  };

  return { count, liked, like };
}