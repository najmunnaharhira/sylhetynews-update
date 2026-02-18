import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  QueryConstraint,
  Timestamp,
  limit,
  orderBy,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { NewsArticle, NewsCategory } from '../types/news';
import { TeamMember } from '../types/team';
import { PhotoCardTemplate } from '../types/photocard';

const NEWS_COLLECTION = 'news';
const CATEGORIES_COLLECTION = 'categories';
const TEAM_COLLECTION = 'team';
const PHOTOCARD_TEMPLATES_COLLECTION = 'photocardTemplates';

// News Operations
export const newsService = {
  // Get all news for admin (including unpublished)
  async getAdminAllNews(): Promise<NewsArticle[]> {
    if (!db) throw new Error('Firebase is not initialized');
    const q = query(collection(db, NEWS_COLLECTION), orderBy('createdAt', 'desc'), limit(200));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    } as NewsArticle));
  },

  // Get all published news
  async getAllNews(): Promise<NewsArticle[]> {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }
    try {
      const q = query(
        collection(db, NEWS_COLLECTION),
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      } as NewsArticle));
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  },

  // Get news by category
  async getNewsByCategory(category: string): Promise<NewsArticle[]> {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }
    try {
      const q = query(
        collection(db, NEWS_COLLECTION),
        where('category', '==', category),
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
        limit(20)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      } as NewsArticle));
    } catch (error) {
      console.error('Error fetching news by category:', error);
      throw error;
    }
  },

  // Get featured news
  async getFeaturedNews(): Promise<NewsArticle[]> {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }
    const q = query(
      collection(db, NEWS_COLLECTION),
      where('featured', '==', true),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(5)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    } as NewsArticle));
  },

  // Get single news article
  async getNews(id: string): Promise<NewsArticle | null> {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }
    const docRef = doc(db, NEWS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate() || new Date(),
        updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
      } as NewsArticle;
    }
    return null;
  },

  // Create news article
  async createNews(article: Omit<NewsArticle, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Promise<string> {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }
    const docRef = await addDoc(collection(db, NEWS_COLLECTION), {
      ...article,
      views: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  },

  // Update news article
  async updateNews(id: string, article: Partial<NewsArticle>): Promise<void> {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }
    const docRef = doc(db, NEWS_COLLECTION, id);
    await updateDoc(docRef, {
      ...article,
      updatedAt: Timestamp.now(),
    });
  },

  // Delete news article
  async deleteNews(id: string): Promise<void> {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }
    const docRef = doc(db, NEWS_COLLECTION, id);
    await deleteDoc(docRef);
  },

  // Publish/Unpublish news
  async togglePublish(id: string, published: boolean): Promise<void> {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }
    const docRef = doc(db, NEWS_COLLECTION, id);
    await updateDoc(docRef, {
      published,
      updatedAt: Timestamp.now(),
    });
  },

  // Increment views
  async incrementViews(id: string): Promise<void> {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }
    const docRef = doc(db, NEWS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const currentViews = docSnap.data().views || 0;
      await updateDoc(docRef, {
        views: currentViews + 1,
      });
    }
  },
};

// Category Operations
export const categoryService = {
  // Get all categories
  async getAllCategories(): Promise<NewsCategory[]> {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }
    const snapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as NewsCategory));
  },

  // Create category
  async createCategory(category: Omit<NewsCategory, 'id'>): Promise<string> {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }
    const docRef = await addDoc(collection(db, CATEGORIES_COLLECTION), category);
    return docRef.id;
  },

  // Update category
  async updateCategory(id: string, category: Partial<NewsCategory>): Promise<void> {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }
    const docRef = doc(db, CATEGORIES_COLLECTION, id);
    await updateDoc(docRef, category);
  },

  // Delete category
  async deleteCategory(id: string): Promise<void> {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }
    const docRef = doc(db, CATEGORIES_COLLECTION, id);
    await deleteDoc(docRef);
  },
};

// Image Upload
export const imageService = {
  async uploadImage(file: File, folder: string = 'news'): Promise<string> {
    if (!storage) {
      throw new Error('Firebase Storage is not initialized');
    }
    const timestamp = Date.now();
    const filename = `${folder}/${timestamp}_${file.name}`;
    const storageRef = ref(storage, filename);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  },
};

// Team Operations
export const teamService = {
  async getTeamMembers(): Promise<TeamMember[]> {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }
    try {
      const q = query(collection(db, TEAM_COLLECTION), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as TeamMember));
    } catch (error) {
      console.error('Error fetching team members:', error);
      throw error;
    }
  },

  async createTeamMember(member: Omit<TeamMember, 'id'>): Promise<string> {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }
    const docRef = await addDoc(collection(db, TEAM_COLLECTION), member);
    return docRef.id;
  },

  async updateTeamMember(id: string, member: Partial<TeamMember>): Promise<void> {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }
    const docRef = doc(db, TEAM_COLLECTION, id);
    await updateDoc(docRef, member);
  },

  async deleteTeamMember(id: string): Promise<void> {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }
    const docRef = doc(db, TEAM_COLLECTION, id);
    await deleteDoc(docRef);
  },
};

// PhotoCard Template Operations
export const photocardTemplateService = {
  async getTemplates(): Promise<PhotoCardTemplate[]> {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }
    try {
      const q = query(
        collection(db, PHOTOCARD_TEMPLATES_COLLECTION),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      } as PhotoCardTemplate));
    } catch (error) {
      console.error('Error fetching templates:', error);
      throw error;
    }
  },

  async getAllTemplates(): Promise<PhotoCardTemplate[]> {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }
    const q = query(
      collection(db, PHOTOCARD_TEMPLATES_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    } as PhotoCardTemplate));
  },

  async createTemplate(template: Omit<PhotoCardTemplate, 'id' | 'createdAt'>): Promise<string> {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }
    const docRef = await addDoc(collection(db, PHOTOCARD_TEMPLATES_COLLECTION), {
      ...template,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  },

  async updateTemplate(id: string, template: Partial<PhotoCardTemplate>): Promise<void> {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }
    const docRef = doc(db, PHOTOCARD_TEMPLATES_COLLECTION, id);
    await updateDoc(docRef, {
      ...template,
      updatedAt: Timestamp.now(),
    });
  },

  async deleteTemplate(id: string): Promise<void> {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }
    const docRef = doc(db, PHOTOCARD_TEMPLATES_COLLECTION, id);
    await deleteDoc(docRef);
  },
};
