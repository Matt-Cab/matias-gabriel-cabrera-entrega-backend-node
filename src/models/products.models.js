import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../data/data.js';

const COLLECTION_NAME = 'products';

const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error al intentar obtener los productos:`, error);
    throw error;
  }
};

const getProductById = async (prodId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, prodId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error(
      `Error al intentar obtener el producto con id ${prodId}:`,
      error,
    );
    throw error;
  }
};

const searchByCategory = async (value) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('category', '==', value),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(
      `Error al realizar la consulta en ${COLLECTION_NAME}:`,
      error,
    );
    throw error;
  }
};

const addProduct = async (product) => {
  try {
    return await addDoc(collection(db, COLLECTION_NAME), product);
  } catch (error) {
    console.error('Error al agregar el documento: ', error);
  }
};

const deletePoproduct = async (prodId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, prodId);

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return null;
    }

    await deleteDoc(docRef);
    return prodId;
  } catch (error) {
    console.error('Error al intentar eliminar el producto: ', error);
  }
};

const productsModels = {
  getProducts,
  getProductById,
  searchByCategory,
  addProduct,
  deletePoproduct,
};

export default productsModels;
