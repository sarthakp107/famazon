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
}));

 