import logo from './logo.png';
import search from './search.png';
import profile from './profile.png';
import cart from './cart.png';
import menu from './menu.png';
import backIcon from './backIcon.png';
import hero from './hero.png';
import womanjacket from './womanjacket.png';
import manjacket from './manjacket.png';
import Kids from './Kids.png';
import womanskirt from './womanskirt.png';
import cross from './cross.png';

export const assets = {
  logo,
  search,
  profile,
  cart,
  menu,
  backIcon,
  hero,
  Kids,
  manjacket,
  womanjacket,
  womanskirt,
  cross,
};

export const products = [
  {
    id: "1",
    name: "Skirts",
    description: "",
    price: "90",
    image: assets.womanskirt, // Reference the imported asset
    category: "Women",
    subCategory: "women",
    sizes: ['S', 'M', 'L'],
    date: "7",
    bestSeller: true, 
  },
  {
    id: "2",
    name: "Jacket",
    description: "",
    price: "101",
    image: assets.womanjacket, // Reference the imported asset
    category: "Women",
    subCategory: "Women",
    sizes: ['S', 'M', 'L'],
    date: "3",
    bestSeller: true, 
  },
  {
    id: "3",
    name: "Kids Fashion",
    description: "",
    price: "80",
    image: assets.Kids, // Reference the imported asset
    category: "Kids",
    subCategory: "Kids",
    sizes: ['S', 'M', 'L'],
    date: "5",
    bestSeller: true, 
  },
  {
    id: "4",
    name: "Jacket",
    description: "",
    price: "200",
    image: assets.manjacket, // Reference the imported asset
    category: "Men",
    subCategory: "man",
    sizes: ['S', 'M', 'L'],
    date: "9",
    bestSeller: true, 
  },
];
