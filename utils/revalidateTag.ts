import { API_URL } from '@/environments/environments';

export async function revalidateTag(tag: string) {
  try {
    const res = await fetch(`${API_URL}/api/revalidate?tag=${tag}`);
    return res;
  } catch (e) {
    return { error: `Could not revalidate tag ${tag}`, details: e };
  }
}
