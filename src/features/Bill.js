import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  Button,
  Input,
  Heading,
  Select,
  CheckIcon,
} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {Formik} from 'formik';
import firestore from '@react-native-firebase/firestore';
import Loading from './Loading';

import {
  addNewBill,
  editExistingBill,
  deleteExistingBill,
  showBills,
  showCategories,
  setCategory,
  getFilterCatgory,
  removeCategory,
  setBills,
  showLoading,
  setLoading,
} from './billSlice';

function AddBillModal({isAddModalVisible, handleAddModalClose}) {
  const dispatch = useDispatch();

  // Initializing the State using Hooks
  const [values, setValues] = useState({
    description: '',
    category: '',
    amount: 0,
    date: '',
  });

  // Validation for the Form
  const [validated, setValidated] = useState(false);

  // Universal Onchange Handler for the form

  // Form Submit function
  const clickSubmit = values => {
    setValues({...values});
    // Dispatching the Event to create a new Bill
    dispatch(addNewBill(values));
    handleAddModalClose();
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        isOpen={isAddModalVisible}
        onClose={handleAddModalClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Add New Bill</Modal.Header>
          <Modal.Body>
            <View>
              <Formik
                initialValues={values}
                onSubmit={values => clickSubmit(values)}>
                {({handleChange, handleBlur, handleSubmit, values}) => (
                  <View>
                    <Input
                      label="Description"
                      placeholder="Add a Description"
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
                    />
                    <Input
                      label="Category"
                      placeholder="Add a Category"
                      onChangeText={handleChange('category')}
                      onBlur={handleBlur('category')}
                      value={values.category}
                    />
                    <Input
                      label="Amount"
                      placeholder="Add a Amount"
                      onChangeText={handleChange('amount')}
                      onBlur={handleBlur('amount')}
                      value={values.amount}
                    />
                    <Input
                      label="Date"
                      placeholder="Add a Date"
                      onChangeText={handleChange('date')}
                      onBlur={handleBlur('date')}
                      value={values.date}
                    />
                    <Button onPress={handleSubmit} title="Submit">
                      <Text>Submit</Text>
                    </Button>
                    <Button onPress={handleAddModalClose} title="Close">
                      <Text>Close</Text>
                    </Button>
                  </View>
                )}
              </Formik>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
}

function EditBillModal({
  isEditModalVisible,
  handleEditModalClose,
  dataValues,
  rowId,
}) {
  const dispatch = useDispatch();

  const [values, setValues] = useState(dataValues);

  const clickSubmit = values => {
    setValues({...values});
    dispatch(editExistingBill({...values, id: rowId}));
    handleEditModalClose();
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        isOpen={isEditModalVisible.status}
        onClose={handleEditModalClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Edit Existing Bill</Modal.Header>
          <Modal.Body>
            <View>
              <Formik
                initialValues={values}
                onSubmit={values => clickSubmit(values)}>
                {({handleChange, handleBlur, handleSubmit, values}) => (
                  <View>
                    <Input
                      label="Description"
                      placeholder="Add a Description"
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
                    />
                    <Input
                      label="Category"
                      placeholder="Add a Category"
                      onChangeText={handleChange('category')}
                      onBlur={handleBlur('category')}
                      value={values.category}
                    />
                    <Input
                      label="Amount"
                      placeholder="Add a Amount"
                      onChangeText={handleChange('amount')}
                      onBlur={handleBlur('amount')}
                      value={values.amount}
                    />
                    <Input
                      label="Date"
                      placeholder="Add a Date"
                      onChangeText={handleChange('date')}
                      onBlur={handleBlur('date')}
                      value={values.date}
                    />
                    <Button onPress={handleSubmit} title="Submit">
                      <Text>Submit</Text>
                    </Button>
                    <Button onPress={handleEditModalClose} title="Close">
                      <Text>Close</Text>
                    </Button>
                  </View>
                )}
              </Formik>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
}

function DeleteBillModal({
  isDeleteModalVisible,
  handleDeleteModalClose,
  rowId,
}) {
  const dispatch = useDispatch();

  const deleteBill = () => {
    dispatch(deleteExistingBill(rowId));
    handleDeleteModalClose();
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        isOpen={isDeleteModalVisible.status}
        onClose={handleDeleteModalClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Delete This Bill</Modal.Header>
          <Modal.Body>
            <View>
              <Text>Are you sure you want to delete this bill?</Text>
              <Button onPress={deleteBill} title="Yes">
                <Text>Yes</Text>
              </Button>
              <Button onPress={handleDeleteModalClose} title="No">
                <Text>No</Text>
              </Button>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
}

const SingleBill = ({
  id,
  description,
  category,
  amount,
  date,
  handleEditModalShow,
  handleDeleteModalShow,
}) => (
  <View background="blue.100" margin="2.5" borderRadius="xl" padding="5">
    <Heading>{description}</Heading>
    <Text pt="3" fontWeight="normal">
      Category: {category}
    </Text>
    <Text pt="3" fontWeight="normal">
      Amount: {amount}
    </Text>
    <Text pt="3" fontWeight="normal">
      Date: {date}
    </Text>
    <Button
      size="sm"
      variant="subtle"
      colorScheme="secondary"
      margin="2.5"
      onPress={() => handleEditModalShow(id)}>
      <Text>Edit Bill</Text>
    </Button>
    <Button
      size="sm"
      variant="subtle"
      colorScheme="secondary"
      margin="2.5"
      onPress={() => handleDeleteModalShow(id)}>
      <Text>Delete Bill</Text>
    </Button>
  </View>
);

const BillScreen = () => {
  const bills = useSelector(showBills);
  const loading = useSelector(showLoading);
  const category = useSelector(getFilterCatgory);
  const listOfCategories = useSelector(showCategories);
  const ref = firestore().collection('Bills');

  const dispatch = useDispatch();

  // Initializing Modal Visibility variables
  const [isAddModalVisible, changeIsAddModalVisible] = useState(false);
  const [isEditModalVisible, changeIsEditModalVisible] = useState({
    status: false,
    rowId: '',
  });
  const [isDeleteModalVisible, changeIsDeleteModalVisible] = useState({
    status: false,
    rowId: '',
  });

  // Initializing the functions to trigger visibility changes in modals
  const handleAddModalClose = () => changeIsAddModalVisible(false);
  const handleEditModalClose = () =>
    changeIsEditModalVisible({
      status: false,
      rowId: '',
    });
  const handleAddModalShow = () => changeIsAddModalVisible(true);
  const handleEditModalShow = id => {
    changeIsEditModalVisible({
      status: true,
      rowId: id,
    });
  };
  const handleDeleteModalClose = () =>
    changeIsDeleteModalVisible({
      status: false,
      rowId: '',
    });
  const handleDeleteModalShow = id => {
    changeIsDeleteModalVisible({
      status: true,
      rowId: id,
    });
  };

  const renderItem = ({item}) => (
    <SingleBill
      id={item.id}
      description={item.description}
      category={item.category}
      amount={item.amount}
      date={item.date}
      handleEditModalShow={handleEditModalShow}
      handleDeleteModalShow={handleDeleteModalShow}
    />
  );

  useEffect(() => {
    ref.onSnapshot(querySnapshot => {
      const list = [];

      querySnapshot.forEach(doc => {
        const {description, category, amount, date, id} = doc.data();
        list.push({
          id: doc.id,
          description,
          category,
          amount,
          date,
          billId: id,
        });
      });

      dispatch(setBills(list));
      dispatch(setLoading(false));
    });
  }, []);

  return (
    <View>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Button
            size="sm"
            variant="subtle"
            colorScheme="primary"
            margin="2.5"
            onPress={handleAddModalShow}>
            <Text>Add New Bill</Text>
          </Button>

          <Select
            selectedValue={category}
            minWidth="200"
            accessibilityLabel="Choose Service"
            placeholder="Choose Service"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={itemValue => dispatch(setCategory(itemValue))}>
            <Select.Item label="All" value="" />
            {listOfCategories.map(category => {
              return <Select.Item label={category} value={category} />;
            })}
          </Select>

          <FlatList data={bills} renderItem={renderItem} />
          <AddBillModal
            isAddModalVisible={isAddModalVisible}
            handleAddModalClose={handleAddModalClose}
          />
          {isEditModalVisible.status ? (
            <EditBillModal
              isEditModalVisible={isEditModalVisible}
              handleEditModalClose={handleEditModalClose}
              dataValues={bills.find(
                bill => bill.id === isEditModalVisible.rowId,
              )}
              rowId={isEditModalVisible.rowId}
            />
          ) : (
            <></>
          )}
          {isDeleteModalVisible.status ? (
            <DeleteBillModal
              isDeleteModalVisible={isDeleteModalVisible}
              handleDeleteModalClose={handleDeleteModalClose}
              rowId={isDeleteModalVisible.rowId}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </View>
  );
};

export default BillScreen;
