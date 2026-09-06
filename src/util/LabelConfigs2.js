const configs = {
    bg: {
      primary: "bg-orange",
      // primary: "bg-primary",
    },
    text: {
      primary: "text-orange",
      // primary: "text-primary",
    },
}
const labelConfigs2 = {
  ...configs,
  //app
  app:{
    name: "Porjo Commerce",
    icon: "fa fa-opencart",
    bgPrimary: configs.bg.primary+" text-white",
    bgSecondary: "bg-dark text-white",
    textPrimary: "text-primary",
  },
  submitForm: {
    btn: "btn w-100 fw-boldx "+configs.bg.primary,
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
    success: 'edit berhasil'
  }, 
  delete: {
    lbl: "Delete",
    btn: "btn btn-danger",
    btnIcon: "btn btn-light btn-smx border",
    icon: "fa fa-trash-o",
    success: 'hapus berhasil',
    failed: 'hapus gagal',
  }, 
  add: {
    lbl: "Tambah",
    btn: "btn btn-success fw-bold",
    icon: "fa fa-plus",
    success: 'tambah berhasil',
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
  link:{ 
    btn: "btn btn-primary",
  },
  upload:{ 
    lbl: "Unggah",
    btn: "btn btn-primary",
    icon: "fa fa-upload me-1",
  },
  image: {
    lbl: 'Gambar'
  }
}

export default labelConfigs2;
