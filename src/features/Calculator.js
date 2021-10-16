import React from 'react';
import {View, Text, FlatList, Input, Heading} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {setMonthlyBudget, filteredBills} from './billSlice';

const SingleBill = ({id, description, category, amount, date}) => (
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
  </View>
);

const CalculatorScreen = () => {
  const bills = useSelector(filteredBills);
  const dispatch = useDispatch();

  // Updating the Monthly Budget
  const updateMonthlyBudget = value => {
    dispatch(setMonthlyBudget(value));
  };

  const renderItem = ({item}) => (
    <SingleBill
      id={item.id}
      description={item.description}
      category={item.category}
      amount={item.amount}
      date={item.date}
    />
  );

  return (
    <View>
      <Input
        size="lg"
        onChangeText={updateMonthlyBudget}
        placeholder="Enter Your Budget"
      />
      <FlatList data={bills} renderItem={renderItem} />
    </View>
  );
};

export default CalculatorScreen;
