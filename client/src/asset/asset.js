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
import star from './star.png';
import dull_star from './dull_star.png';

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
  star,
  dull_star,
};

export const products = [
  {
    id: "1",
    name: "Elegant Women's Skirt",
    description: "A stylish and comfortable skirt for all occasions. Made with high-quality fabric, perfect for casual outings or formal events.",
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
    name: "Women's Winter Jacket",
    description: "Stay warm and fashionable with this premium winter jacket. Features a durable outer shell and soft inner lining for maximum comfort.",
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
    name: "Kids' Trendy Fashion Set",
    description: "An adorable and practical outfit for kids, combining style and comfort. Includes vibrant colors and soft fabric suitable for play or outings.",
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
    name: "Men's Classic Jacket",
    description: "A timeless classic jacket for men. Perfect for chilly days, with a sleek design that complements both casual and formal wear.",
    price: "200",
    image: assets.manjacket, // Reference the imported asset
    category: "Men",
    subCategory: "man",
    sizes: ['S', 'M', 'L'],
    date: "9",
    bestSeller: true,
  },
  {
    id: "5",
    name: "Casual Men's T-Shirt",
    description: "A lightweight and breathable T-shirt for everyday use. Comes in various colors and sizes to fit your style.",
    price: "45",
    image: assets.mantshirt, // Reference the imported asset
    category: "Men",
    subCategory: "man",
    sizes: ['S', 'M', 'L', 'XL'],
    date: "2",
    bestSeller: false,
  },
  {
    id: "6",
    name: "Kids' Adventure Jacket",
    description: "Keep your kids warm during their outdoor adventures with this durable and lightweight jacket. Ideal for all seasons.",
    price: "70",
    image: assets.kidsjacket, // Reference the imported asset
    category: "Kids",
    subCategory: "Kids",
    sizes: ['S', 'M', 'L'],
    date: "4",
    bestSeller: false,
  },
  {
    id: "7",
    name: "Women's Evening Dress",
    description: "An elegant evening dress designed for special occasions. Features a flattering fit and luxurious fabric for a graceful look.",
    price: "150",
    image: assets.womandress, // Reference the imported asset
    category: "Women",
    subCategory: "women",
    sizes: ['S', 'M', 'L', 'XL'],
    date: "10",
    bestSeller: true,
  },
];

