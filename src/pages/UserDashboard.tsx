import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Bookmark {
  id: string;
  post_id: string;
  post_title: string;
  post_slug: string;
}

interface HistoryItem {
  id: string;
  post_id: string;
  post_title: string;
  post_slug: string;
  viewed_at: string;
}

interface CommentItem {
  id: string;
  post_id: string;
  post_title: string;
  content: string;
  created_at: string;
}

const UserDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'profile' | 'bookmarks' | 'history' | 'comments'>('profile');
  const [profile, setProfile] = useState({
    full_name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    password: '',
  });
  const [saving, setSaving] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user data using REST API for custom tables
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    setError('');
    const fetchData = async () => {
      try {
        // Bookmarks
        const bmRes = await fetch(`/rest/v1/bookmarks?user_id=eq.${user.id}&select=id,post_id,posts(title,slug)`, {
          headers: { 'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY }
        });
        const bm: Array<{ id: string; post_id: string; posts: { title: string; slug: string } }> = await bmRes.json();
        setBookmarks(
          bm.map((b) => ({
            id: b.id,
            post_id: b.post_id,
            post_title: b.posts?.title || '',
            post_slug: b.posts?.slug || '',
          }))
        );
        // History
        const histRes = await fetch(`/rest/v1/reading_history?user_id=eq.${user.id}&select=id,post_id,posts(title,slug),viewed_at&order=viewed_at.desc&limit=10`, {
          headers: { 'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY }
        });
        const hist: Array<{ id: string; post_id: string; posts: { title: string; slug: string }; viewed_at: string }> = await histRes.json();
        setHistory(
          hist.map((h) => ({
            id: h.id,
            post_id: h.post_id,
            post_title: h.posts?.title || '',
            post_slug: h.posts?.slug || '',
            viewed_at: h.viewed_at,
          }))
        );
        // Comments
        const commRes = await fetch(`/rest/v1/comments?user_id=eq.${user.id}&select=id,post_id,posts(title),content,created_at&order=created_at.desc`, {
          headers: { 'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY }
        });
        const comm: Array<{ id: string; post_id: string; posts: { title: string }; content: string; created_at: string }> = await commRes.json();
        setComments(
          comm.map((c) => ({
            id: c.id,
            post_id: c.post_id,
            post_title: c.posts?.title || '',
            content: c.content,
            created_at: c.created_at,
          }))
        );
      } catch (e) {
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  // Profile update handler
  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      // Update profile in Supabase
      const updates = {
        data: {
          full_name: profile.full_name,
        },
        email: profile.email,
        password: profile.password || undefined,
      };
      const { error: updateError } = await supabase.auth.updateUser(updates);
      if (updateError) throw updateError;
      setSaving(false);
      alert('Profile updated!');
    } catch (e) {
      setError('Failed to update profile.');
      setSaving(false);
    }
  };

  // Delete comment
  const handleDeleteComment = async (id: string) => {
    if (!window.confirm('Delete this comment?')) return;
    await fetch(`/rest/v1/comments?id=eq.${id}`, {
      method: 'DELETE',
      headers: { 'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY }
    });
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white dark:bg-gray-900 rounded shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex gap-2">
          <button onClick={() => setTab('profile')} className={`px-4 py-2 rounded ${tab === 'profile' ? 'bg-teal-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}>Profile</button>
          <button onClick={() => setTab('bookmarks')} className={`px-4 py-2 rounded ${tab === 'bookmarks' ? 'bg-teal-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}>Bookmarks</button>
          <button onClick={() => setTab('history')} className={`px-4 py-2 rounded ${tab === 'history' ? 'bg-teal-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}>History</button>
          <button onClick={() => setTab('comments')} className={`px-4 py-2 rounded ${tab === 'comments' ? 'bg-teal-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}>Comments</button>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate('/')} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Home</button>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Log out</button>
        </div>
      </div>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {loading ? (
        <div className="text-center py-10 text-gray-400">Loading...</div>
      ) : (
        <div>
          {tab === 'profile' && (
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="flex flex-col items-center gap-2">
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-48 text-center"
                  placeholder="Full Name"
                  value={profile.full_name}
                  onChange={e => setProfile({ ...profile, full_name: e.target.value })}
                />
                <input
                  type="email"
                  className="border rounded px-2 py-1 w-48 text-center"
                  placeholder="Email"
                  value={profile.email}
                  onChange={e => setProfile({ ...profile, email: e.target.value })}
                />
                <input
                  type="password"
                  className="border rounded px-2 py-1 w-48 text-center"
                  placeholder="New Password"
                  value={profile.password}
                  onChange={e => setProfile({ ...profile, password: e.target.value })}
                  autoComplete="current-password"
                />
              </div>
              <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
            </form>
          )}
          {tab === 'bookmarks' && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Saved Posts</h3>
              {bookmarks.length === 0 ? (
                <div className="text-gray-400">No bookmarks yet.</div>
              ) : (
                <ul className="space-y-2">
                  {bookmarks.map(b => (
                    <li key={b.id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 rounded px-3 py-2">
                      <a href={`/blog/${b.post_slug}`} className="text-teal-600 dark:text-teal-400 hover:underline">{b.post_title}</a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {tab === 'history' && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Reading History</h3>
              {history.length === 0 ? (
                <div className="text-gray-400">No reading history yet.</div>
              ) : (
                <ul className="space-y-2">
                  {history.map(h => (
                    <li key={h.id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 rounded px-3 py-2">
                      <a href={`/blog/${h.post_slug}`} className="text-teal-600 dark:text-teal-400 hover:underline">{h.post_title}</a>
                      <span className="text-xs text-gray-400">{new Date(h.viewed_at).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {tab === 'comments' && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Your Comments</h3>
              {comments.length === 0 ? (
                <div className="text-gray-400">No comments yet.</div>
              ) : (
                <ul className="space-y-2">
                  {comments.map(c => (
                    <li key={c.id} className="bg-gray-50 dark:bg-gray-800 rounded px-3 py-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-teal-700 dark:text-teal-300">{c.post_title}</span>
                        <button onClick={() => handleDeleteComment(c.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                      </div>
                      <div className="text-gray-700 dark:text-gray-200 text-sm mt-1">{c.content}</div>
                      <div className="text-xs text-gray-400 mt-1">{new Date(c.created_at).toLocaleString()}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
