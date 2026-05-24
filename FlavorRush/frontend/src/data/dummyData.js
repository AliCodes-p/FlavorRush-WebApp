import { getProductImage, FOOD_IMAGES } from '../utils/foodImages'

export const dummyProducts = [
  {
    id: 1,
    name: 'Crispy Chicken Burger',
    category: 'burgers',
    price: 299,
    image: getProductImage(1, 'burgers'),
    description: 'Juicy grilled chicken with crispy golden coating',
    rating: 4.8,
    reviews: 234,
    ingredients: ['Chicken', 'Lettuce', 'Tomato', 'Cheese', 'Sauce'],
    nutrition: { calories: 520, protein: '28g', fat: '22g', carbs: '45g' },
    isSpicy: true,
    spiceLevel: 2,
    prepTime: '15 mins',
    bestseller: true
  },
  {
    id: 2,
    name: 'Classic Cheeseburger',
    category: 'burgers',
    price: 279,
    image: getProductImage(2, 'burgers'),
    description: 'Our signature burger with premium beef and melted cheese',
    rating: 4.7,
    reviews: 456,
    ingredients: ['Beef', 'Cheddar Cheese', 'Lettuce', 'Tomato', 'Pickles'],
    nutrition: { calories: 580, protein: '32g', fat: '28g', carbs: '48g' },
    isSpicy: false,
    spiceLevel: 0,
    prepTime: '12 mins',
    bestseller: true
  },
  {
    id: 3,
    name: 'Spicy Chicken Wings',
    category: 'starters',
    price: 199,
    image: getProductImage(3, 'starters'),
    description: '8 pieces of our signature spicy wings with herbs',
    rating: 4.6,
    reviews: 178,
    ingredients: ['Chicken Wings', 'Chili', 'Garlic', 'Herbs'],
    nutrition: { calories: 340, protein: '24g', fat: '18g', carbs: '8g' },
    isSpicy: true,
    spiceLevel: 4,
    prepTime: '10 mins',
    bestseller: false
  },
  {
    id: 4,
    name: 'Cheese Fries',
    category: 'sides',
    price: 129,
    image: getProductImage(4, 'sides'),
    description: 'Crispy golden fries topped with melted cheese sauce',
    rating: 4.5,
    reviews: 289,
    ingredients: ['Potatoes', 'Cheese Sauce', 'Salt', 'Seasoning'],
    nutrition: { calories: 380, protein: '8g', fat: '16g', carbs: '52g' },
    isSpicy: false,
    spiceLevel: 0,
    prepTime: '8 mins',
    bestseller: false
  },
  {
    id: 5,
    name: 'Grilled Chicken Sandwich',
    category: 'sandwiches',
    price: 249,
    image: getProductImage(5, 'sandwiches'),
    description: 'Tender grilled chicken breast with fresh vegetables',
    rating: 4.9,
    reviews: 345,
    ingredients: ['Grilled Chicken', 'Lettuce', 'Tomato', 'Onion', 'Mayo'],
    nutrition: { calories: 420, protein: '35g', fat: '12g', carbs: '42g' },
    isSpicy: false,
    spiceLevel: 0,
    prepTime: '14 mins',
    bestseller: true
  },
  {
    id: 6,
    name: 'Double Layered Pizza',
    category: 'pizza',
    price: 399,
    image: getProductImage(6, 'pizza'),
    description: 'Thick crust pizza loaded with toppings and extra cheese',
    rating: 4.7,
    reviews: 512,
    ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Toppings'],
    nutrition: { calories: 650, protein: '28g', fat: '24g', carbs: '78g' },
    isSpicy: false,
    spiceLevel: 0,
    prepTime: '20 mins',
    bestseller: true
  },
  {
    id: 7,
    name: 'Masala Fries',
    category: 'sides',
    price: 149,
    image: getProductImage(7, 'sides'),
    description: 'Golden fries with special masala seasoning',
    rating: 4.4,
    reviews: 198,
    ingredients: ['Potatoes', 'Masala Powder', 'Salt', 'Oil'],
    nutrition: { calories: 320, protein: '5g', fat: '14g', carbs: '45g' },
    isSpicy: true,
    spiceLevel: 3,
    prepTime: '10 mins',
    bestseller: false
  },
  {
    id: 8,
    name: 'Veggie Supreme Pizza',
    category: 'pizza',
    price: 349,
    image: getProductImage(8, 'pizza'),
    description: 'Loaded with fresh vegetables and herbs',
    rating: 4.5,
    reviews: 267,
    ingredients: ['Dough', 'Vegetables', 'Cheese', 'Herbs'],
    nutrition: { calories: 520, protein: '18g', fat: '16g', carbs: '72g' },
    isSpicy: false,
    spiceLevel: 0,
    prepTime: '18 mins',
    bestseller: false
  },
  {
    id: 9,
    name: 'Loaded Nachos',
    category: 'starters',
    price: 229,
    image: getProductImage(9, 'starters'),
    description: 'Crispy nachos with cheese, jalapeños, and sour cream',
    rating: 4.6,
    reviews: 334,
    ingredients: ['Tortilla Chips', 'Cheese', 'Jalapeños', 'Sour Cream'],
    nutrition: { calories: 480, protein: '12g', fat: '26g', carbs: '52g' },
    isSpicy: true,
    spiceLevel: 2,
    prepTime: '8 mins',
    bestseller: false
  },
  {
    id: 10,
    name: 'Chicken Kebab',
    category: 'starters',
    price: 189,
    image: getProductImage(10, 'starters'),
    description: 'Tender marinated chicken on skewers with yogurt sauce',
    rating: 4.7,
    reviews: 445,
    ingredients: ['Chicken', 'Yogurt', 'Spices', 'Herbs'],
    nutrition: { calories: 280, protein: '32g', fat: '12g', carbs: '8g' },
    isSpicy: true,
    spiceLevel: 3,
    prepTime: '12 mins',
    bestseller: true
  },
  {
    id: 11,
    name: 'Chocolate Lava Cake',
    category: 'desserts',
    price: 149,
    image: getProductImage(11, 'desserts'),
    description: 'Rich chocolate cake with molten center served with ice cream',
    rating: 4.9,
    reviews: 523,
    ingredients: ['Chocolate', 'Eggs', 'Butter', 'Flour'],
    nutrition: { calories: 420, protein: '6g', fat: '22g', carbs: '52g' },
    isSpicy: false,
    spiceLevel: 0,
    prepTime: '8 mins',
    bestseller: false
  },
  {
    id: 12,
    name: 'Strawberry Cheesecake',
    category: 'desserts',
    price: 159,
    image: getProductImage(12, 'desserts'),
    description: 'Creamy cheesecake with fresh strawberry topping',
    rating: 4.8,
    reviews: 412,
    ingredients: ['Cream Cheese', 'Strawberry', 'Graham Cracker', 'Sugar'],
    nutrition: { calories: 380, protein: '8g', fat: '18g', carbs: '48g' },
    isSpicy: false,
    spiceLevel: 0,
    prepTime: '2 mins',
    bestseller: false
  }
]

export const categories = [
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'sandwiches', name: 'Sandwiches', icon: '🥪' },
  { id: 'starters', name: 'Starters', icon: '🍗' },
  { id: 'sides', name: 'Sides', icon: '🍟' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
]

export const testimonials = [
  {
    id: 1,
    name: 'Rahul Kumar',
    role: 'Food Enthusiast',
    image: FOOD_IMAGES.avatar1,
    text: 'FlavorRush has revolutionized my food ordering experience. The quality and speed are unmatched!',
    rating: 5
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Business Executive',
    image: FOOD_IMAGES.avatar2,
    text: 'Best platform for ordering food. Their customer service is exceptional and delivery is always on time.',
    rating: 5
  },
  {
    id: 3,
    name: 'Arjun Singh',
    role: 'Student',
    image: FOOD_IMAGES.avatar3,
    text: 'Affordable, fast, and delicious. What more could you ask for? Highly recommended!',
    rating: 5
  },
]

export const promotions = [
  {
    id: 1,
    title: '50% Off on First Order',
    description: 'Use code FIRST50 for exciting discounts',
    image: FOOD_IMAGES.promoDessert,
    code: 'FIRST50',
    discount: 50
  },
  {
    id: 2,
    title: 'Free Delivery on Orders Above ₹500',
    description: 'Order now and get free delivery',
    image: FOOD_IMAGES.promoBurger,
    code: 'FREE500',
    discount: 0
  },
  {
    id: 3,
    title: 'Buy 2 Get 1 Free',
    description: 'On selected burgers this weekend',
    image: FOOD_IMAGES.promoCheeseburger,
    code: 'BUY2GET1',
    discount: 0
  },
]

export const orderStatuses = [
  { id: 1, status: 'pending', label: 'Order Confirmed', icon: '✓' },
  { id: 2, status: 'preparing', label: 'Preparing', icon: '👨‍🍳' },
  { id: 3, status: 'ready', label: 'Ready for Delivery', icon: '📦' },
  { id: 4, status: 'out_for_delivery', label: 'Out for Delivery', icon: '🚗' },
  { id: 5, status: 'delivered', label: 'Delivered', icon: '✓' }
]
