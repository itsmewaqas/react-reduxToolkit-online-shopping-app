import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'productSlice',
    initialState: {
        itemList: [],
        selectedCard: [],
        loading: false,
        error: null,
    },

    reducers: {

        getCardData: (state, action) => {
            state.selectedCard = action.payload;
        },

        addProduct: (state, action) => {
            state.itemList = addProductList(state.itemList, action.payload)
        },

        productIncrement: (state, action) => {
            state.itemList = addExistingProduct(state.itemList, action.payload)
        },

        productDecrement: (state, action) => {
            state.itemList = removeExistingProduct(state.itemList, action.payload)
        },

        removeProduct : (state, action) => {
            state.itemList = state.itemList.filter(item => item.id !== action.payload.id || item.parentID !== action.payload.parentID);
        },

        ordersuccess: (state, action) => {
            state.itemList = []
            state.selectedCard = []
        },

    },
});

const addProductList = ((itemList, itemToAdd) => {
    const existingItem = itemList.find(item => item.id === itemToAdd.id && item.parentID == itemToAdd.parentID);
    if (existingItem) {
        return itemList.map(item =>
            item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        )
    }
    else {
        return [...itemList, { ...itemToAdd, quantity: 1 }]
    }
});

const addExistingProduct = ((itemList, itemToAdd) => {
    return itemList.map(item =>
        item.id === itemToAdd.id && item.parentID == itemToAdd.parentID ? { ...item, quantity: item.quantity + 1 } : item
    )
});

const removeExistingProduct = (itemList, itemToRemove) => {
    const existingItem = itemList.find(item => item.id === itemToRemove.id && item.parentID === itemToRemove.parentID);

    if (existingItem) {
        if (existingItem.quantity <= 1) {
            return itemList.filter(item => item.id !== existingItem.id || item.parentID !== existingItem.parentID);
        } else {
            return itemList.map(item =>
                item.id === itemToRemove.id && item.parentID === itemToRemove.parentID
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        }
    } else {
        return itemList;
    }
};

export default productSlice.reducer;
export const { getCardData, addProduct, productIncrement, productDecrement, removeProduct, ordersuccess } = productSlice.actions;












