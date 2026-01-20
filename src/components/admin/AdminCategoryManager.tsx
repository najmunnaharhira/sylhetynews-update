import { useState, useEffect, FormEvent } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Edit2, Trash2, Plus, AlertCircle } from 'lucide-react';
import { categoryService } from '../../services/firebaseService';
import { NewsCategory } from '../../types/news';

export default function AdminCategoryManager() {
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', slug: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const cats = await categoryService.getAllCategories();
      setCategories(cats);
    } catch (err) {
      console.error('Error loading categories:', err);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim()) {
      setError('Category name is required');
      return;
    }

    const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-');

    try {
      if (editingId) {
        // Update
        await categoryService.updateCategory(editingId, {
          name: formData.name,
          slug,
        });
        setSuccess('Category updated successfully!');
      } else {
        // Create
        await categoryService.createCategory({
          name: formData.name,
          slug,
        });
        setSuccess('Category created successfully!');
      }

      setFormData({ name: '', slug: '' });
      setEditingId(null);
      loadCategories();

      setTimeout(() => setSuccess(''), 2000);
    } catch (err: any) {
      setError(err.message || 'Error saving category');
    }
  };

  const handleEdit = (category: NewsCategory) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      slug: category.slug,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryService.deleteCategory(id);
        setSuccess('Category deleted successfully!');
        loadCategories();
        setTimeout(() => setSuccess(''), 2000);
      } catch (err: any) {
        setError(err.message || 'Error deleting category');
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: '', slug: '' });
    setError('');
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Form */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {editingId ? 'Edit Category' : 'Add New Category'}
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
            <AlertCircle className="text-red-500 flex-shrink-0" size={18} />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name *
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Breaking News, Sports, Technology"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL Slug
            </label>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="Auto-generated from name"
            />
            <p className="text-xs text-gray-500 mt-1">Leave blank to auto-generate</p>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700"
            >
              {editingId ? 'Update Category' : 'Add Category'}
            </Button>
            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>

      {/* Categories List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
        {categories.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No categories yet. Create your first one!</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {categories.map((category) => (
              <Card key={category.id} className="p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">{category.name}</h4>
                  <p className="text-sm text-gray-600">{category.slug}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(category)}
                  >
                    <Edit2 className="text-blue-600" size={18} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash2 className="text-red-600" size={18} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
