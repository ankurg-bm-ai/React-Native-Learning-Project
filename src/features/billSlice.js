import {createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

// The Initial Index of the Bills

const ref = firestore().collection('Bills');

// This is the Initial State
const initialState = {
  listOfBills: [],
  category: '',
  monthlyBudget: 0,
  loading: true,
};

// Creating a BillSlice with the reducers and initialState
export const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    // This reducer will create a new Bill and add it to the array
    addNewBill: (state, action) => {
      ref
        .add({
          ...action.payload,
        })
        .then(() => {
          alert('Bill Has Been Successfully Added');
        });
    },

    // This reducer will edit an existing Bill
    editExistingBill: (state, action) => {
      const {description, category, amount, date, id} = action.payload;

      ref
        .doc(id)
        .update({
          description,
          category,
          amount,
          date,
        })
        .then(() => {
          alert('The Bill has been updated!');
        });
    },

    // This reducer will delete an existing bill
    deleteExistingBill: (state, action) => {
      ref
        .doc(action.payload)
        .delete()
        .then(() => {
          alert('The Bill has been Deleted!');
        });
    },

    // This reducer will set a category for the filter
    setCategory: (state, action) => {
      state.category = action.payload;
    },

    // This reducer will reset the category filter
    removeCategory: state => {
      state.category = '';
    },

    // This reducer will help to set the monthly budget
    setMonthlyBudget: (state, action) => {
      state.monthlyBudget = action.payload;
    },

    setBills: (state, action) => {
      state.listOfBills = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  addNewBill,
  editExistingBill,
  deleteExistingBill,
  setCategory,
  removeCategory,
  setMonthlyBudget,
  setBills,
  setLoading,
} = billSlice.actions;

// This function helps us to show all the bills on the basis of filters
export const showBills = state => {
  if (state.bill.category === '') {
    return state.bill.listOfBills;
  }
  const filteredBills = state.bill.listOfBills.filter(
    bill => bill.category === state.bill.category,
  );

  return filteredBills;
};

// This function shows the filtered bills on the calculator screen
export const filteredBills = state => {
  const sortedBills = state.bill.listOfBills
    .slice()
    .sort((bill1, bill2) => bill1.amount > bill2.amount);

  let budget = state.bill.monthlyBudget;

  var filteredBills = [];

  // eslint-disable-next-line array-callback-return
  sortedBills.map(bill => {
    if (Number(bill.amount) <= Number(budget)) {
      filteredBills.push(bill);
      budget -= bill.amount;
    }
  });

  return filteredBills;
};

// This function returns the chosen category for the filter
export const getFilterCatgory = state => state.bill.category;

// This function returns the list of unique categories from all the bills to be shown to the user
export const showCategories = state => {
  const categories = [
    ...new Set(state.bill.listOfBills.map(bill => bill.category)),
  ];

  return categories;
};

export const showLoading = state => state.bill.loading;

export default billSlice.reducer;
