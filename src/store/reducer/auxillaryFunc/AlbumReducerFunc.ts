import {
  UserState, FetchAlbumSuccess,
  FetchAlbumError, SetAlbumPage, AddItemToCart, CartItems,
  Albums,
  CartAction
} from "../../../types/albumsTypes"

const fetchAlbumLoading = (state: UserState): UserState => {
  return {
    ...state,
    albums: [],
    loading: true,
    error: null,
  }
}

const fetchAlbumSuccess = (state: UserState, action: FetchAlbumSuccess): UserState => {
  return {
    ...state,
    albums: action.payload,
    loading: false,
    error: null,
  }
}

const fetchAlbumError = (state: UserState, action: FetchAlbumError): UserState => {
  return {
    ...state,
    albums: [],
    loading: false,
    error: action.payload,
  }
}

const setAlbumPage = (state: UserState, action: SetAlbumPage): UserState => {
  return {
    ...state,
    page: action.payload,
  }
}

const updateCartItems = (cartList: CartItems[],
  item: CartItems, itemIdx: number) => {

  if (item.count === 0) {
    return [
      ...cartList.slice(0, itemIdx),
      ...cartList.slice(itemIdx + 1)
    ]
  }
  if (itemIdx === -1) {
    return [
      ...cartList,
      item,
    ]
  } else {
    return [
      ...cartList.slice(0, itemIdx),
      item,
      ...cartList.slice(itemIdx + 1)
    ]
  }
}

const updateItem = (album: Albums, item: CartItems, quantity: number) => {

  if (item) {
    return {
      ...item,
      count: item.count + quantity,
      totalPrice: item.totalPrice + item.price * quantity
    }
  } else {
    return {
      userId: album.userId,
      id: album.id,
      title: album.title,
      price: 10,
      count: 1,
      totalPrice: album.price
    }
  }
}

const updateCart = (state: UserState, action: CartAction, quantity: number): UserState => {
  const productId: number = action.payload;
  const album: Albums = state.albums.find(album => album.id === productId)!;
  if (!album) return {
    ...state,
    cartList: [
      ...state.cartList
    ],
  }
  const newTotalPrice = (state: UserState) => state.cartList
    .reduce((prev, current) => prev + current.price, 0);
  const itemIdx = state.cartList.findIndex(album => album.id === productId);
  const item = state.cartList[itemIdx];

  let newItem: CartItems = updateItem(album, item, quantity);

  return {
    ...state,
    cartList: updateCartItems(state.cartList, newItem, itemIdx),
    totalPrice: newTotalPrice(state),
  }
}

const cleanCart = (state: UserState): UserState => {
  return {
    ...state,
    cartList: [],
    totalPrice: null,
  }
}

export {
  fetchAlbumLoading,
  fetchAlbumSuccess,
  fetchAlbumError,
  setAlbumPage,
  updateCart,
  cleanCart,
}