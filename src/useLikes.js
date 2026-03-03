import { useState, useEffect } from 'react';
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

    const { data, error } = await supabase
      .from('likes')
      .select('count')
      .eq('page_id', pageId)
      .single();

    console.log('fetch result:', data, error);

    if (data) {
      const { error: updateError } = await supabase
        .from('likes')
        .update({ count: data.count + 1 })
        .eq('page_id', pageId);
      console.log('update error:', updateError);
      setCount(data.count + 1);
    } else {
      const { error: insertError } = await supabase
        .from('likes')
        .insert({ page_id: pageId, count: 1 });
      console.log('insert error:', insertError);
      setCount(1);
    }
    setLiked(true);
  };

  return { count, liked, like };
}