// import { useLocalStorage } from 'react-use';
// const [token, setToken] = useLocalStorage("token", "");
const token = false;

export const labelConfigs = {
  //button
  //app
  app:{
    name: "Sky Commerce",
    icon: "fa fa-opencart",
    bgPrimary: "bg-primary text-white",
    bgSecondary: "bg-dark text-white",
    textPrimary: "text-primary",
    // isLogin: false,
    isLogin: token,
  },
  submitForm: {
    btn: "btn btn-primary w-100 fw-bold",
    // icon: "fa fa-save",
    icon: "fa fa-save",
  }, 
  save: {
    lbl: "Simpan",
    btn: "btn btn-success fw-bold",
    btnIcon: "btn btn-outline-primary btn-sm",
    icon: "fa fa-plus",
  }, 
  create: {
    lbl: "Buat",
    btn: "btn btn-success fw-bold",
    btnIcon: "btn btn-outline-primary btn-sm",
    icon: "fa fa-plus",
  }, 
  edit: {
    lbl: "Ubah",
    btn: "btn btn-primary",
    // btnIcon: "btn btn-outline-primary btn-sm",
    btnIcon: "btn btn-light btn-smx border",
    // icon: "fa fa-pencil-square-o",
    icon: "fa fa-pencil",
  }, 
  delete: {
    lbl: "Delete",
    btn: "btn btn-danger",
    btnIcon: "btn btn-light btn-smx border",
    icon: "fa fa-trash-o",
  }, 
  add: {
    lbl: "Tambah",
    btn: "btn btn-success fw-bold",
    icon: "fa fa-plus",
  },
  list: {
    lbl: "Data",
    btn: "btn btn-primary",
    icon: "fa fa-table",
  }, 
  view: {
    lbl: "Lihat",
    btn: "btn btn-info",
    icon: "fa fa-eye",
  }, 
  detil: {
    lbl: "Detail",
    btn: "btn btn-info",
    btnIcon: "btn btn-light border",
    icon: "fa fa-eye",
    btnIconVrnt: "light",
  },
  popUp:{ 
    lbl: "Pop up",
    btn: "btn btn-info",
    btnIcon: "btn btn-outline-primary btn-sm",
    icon: "fa fa-external-link",
    variant: "outline-primary btn-sm",
  },
  signIn:{ 
    // lbl: "Sign In",
    // icon: "fa fa-sign-in In me-1",
    icon: "",
  },
  signOut:{ 
    // lbl: "Sign In",
    icon: "fa fa-sign-in In me-1",
    icon: "",
  },
  jual:{ 
    lbl: "Penjualan",
  },
  cart: {
    lbl: "Keranjang",
    icon: "fa fa-cart-plus",
  },
  order: {
    lbl: "Bayar",
    icon: "fa fa-money",
  },

  //component 
  table: {
    class: "table table-borderedx table-sm",
  },
  btn:{ 
    outlineSm: "btn btn-outline-primary btn-sm",
    vrntOutlSm: "outline-primary",
  },
}  

