import {create} from "zustand"

export const useProductStore = create( (set) => ({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async(newProduct) => {
        try {
            console.log('Sending product:', newProduct); // Debug log
    
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProduct)
            });
    
            if (!res.ok) {
                const errorData = await res.text();
                console.error('Server response:', errorData);
                throw new Error(`Server responded with ${res.status}`);
            }
    
            const data = await res.json();
            set((state) => ({products: [...state.products, data.data]}));
            return {success: true, message: "Product created successfully"};
        } catch (error) {
            console.error('Error:', error);
            return {success: false, message: error.message};
        }
    },

    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data.data});
    },

    deleteProduct: async(pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",

        });
        const data = await res.json();
        if(!data.success) return {success:false , message: data.message};
        set(state => ({products: state.products.filter(product => product._id !== pid)})); //updates the ui without refeershing
        return {success: true, message: data.message};
    },
    updateProduct: async(pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`,{
            method: "PUT",
            headers: {
                "Content-type" : "application/json",
            },
            body: JSON.stringify(updatedProduct),
        }
        );
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};
        set(state => ({
            products: state.products.map(product => product._id === pid? data.data : product)
        }));

        return {success : true, message: data.message};

    }
}));

 