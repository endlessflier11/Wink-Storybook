import { CLAIM } from './common';

const emptyProduct = {
  image: 'product.png',
  title: 'Ari Heart Gold Pendant Necklace',
  price: '$100',
  shipping: 'free 2-day shipping',
  info: {
    claims: [],
    dibs: {
      [CLAIM.HAS]: { name: CLAIM.HAS, target: 'Ari Heart' },
      [CLAIM.LOVES_THE]: { name: CLAIM.LOVES_THE, target: 'Leaf' },
    },
  },
  detail: {
    label: '...',
    users: [],
  },
};

const product = {
  image: 'product.png',
  title: 'Ari Heart Gold Pendant Necklace',
  price: '$100',
  shipping: 'free 2-day shipping',
  info: {
    claims: [
      {
        id: 7,
        firstName: 'Katy',
        dibs: {
          // [CLAIM.WANTS]: { name: CLAIM.WANTS, target: 'Ari Heart' },
          [CLAIM.LOVES_THE]: {
            name: CLAIM.LOVES_THE,
            target: 'Growing plants',
          },
        },
      },
    ],
  },
  detail: {
    label: '...',
    users: [],
  },
};

const product1 = {
  ...product,
  info: {
    claims: [
      {
        id: 1,
        firstName: 'Katy',
        dibs: {
          [CLAIM.HAS]: { name: CLAIM.HAS, target: 'Cacti' },
          [CLAIM.LOVES_THE]: {
            name: CLAIM.LOVES_THE,
            target: 'Growing plants',
          },
        },
      },
      {
        id: 2,
        firstName: 'John',
        dibs: { [CLAIM.WANTS]: { name: CLAIM.WANTS } },
      },
    ],
  },
  detail: {
    label: '...',
    users: [],
  },
};

const product2 = {
  image: 'product.png',
  title: 'Ari Heart Gold Pendant Necklace',
  price: '$100',
  shipping: 'free 2-day shipping',
  info: {
    claims: [
      {
        id: 7,
        firstName: 'Katy',
        avatar:
          'https://avataaars.io/?avatarStyle=Circle&topType=NoHair&accessoriesType=Kurt&facialHairType=BeardMajestic&facialHairColor=Black&clotheType=BlazerShirt&eyeType=Dizzy&eyebrowType=Default&mouthType=Tongue&skinColor=Tanned',
        dibs: { [CLAIM.HAS]: { name: CLAIM.HAS, target: 'Growing plants' } },
      },
      {
        id: 8,
        firstName: 'Elizabeth',
        dibs: {
          [CLAIM.WANTS]: { name: CLAIM.WANTS, target: 'Growing plants' },
        },
      },
      {
        id: 9,
        firstName: 'Jamed',
        dibs: {
          [CLAIM.LOVES_THE]: {
            name: CLAIM.LOVES_THE,
            target: 'Growing plants',
          },
        },
      },
      {
        id: 2,
        firstName: 'Xee',
        avatar: null,
        dibs: { [CLAIM.HAS]: { name: CLAIM.HAS, target: 'Growing plants' } },
      },
      {
        id: 3,
        firstName: 'Micheal',
        avatar:
          'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
        dibs: {
          [CLAIM.WANTS]: { name: CLAIM.WANTS, target: 'Growing plants' },
        },
      },
      {
        id: 4,
        firstName: 'John',
        dibs: {
          [CLAIM.WANTS]: { name: CLAIM.WANTS, target: 'Growing plants' },
        },
      },
    ],
    // dibs: [
    //   {
    //     name: CLAIM.HAS,
    //   },
    // ],
  },
  detail: {
    label: 'Zahia and 3 more want this...',
    users: [
      {
        id: 2,
        firstName: 'Michael',
        lastName: 'Jordan',
        birthDate: '5/12/1989',
        avatar: null,
        status: ['want this'],
      },
      {
        id: 3,
        firstName: 'Joe',
        lastName: 'Biden',
        birthDate: '6/12/1989',
        avatar:
          'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
        status: ['has this'],
      },
      {
        id: 4,
        firstName: 'Kate',
        lastName: 'Biden',
        birthDate: '6/12/1989',
        avatar:
          'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
        status: ['is digging this for New Mexico'],
      },
      {
        id: 5,
        firstName: 'Katalina',
        lastName: 'Biden',
        birthDate: '9/12/1998',
        avatar:
          'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
        status: ['is digging this for New Mexico'],
      },
    ],
  },
};

const products = [
  // {
  //   ...noSocialProduct,
  //   id: 1,
  //   image: '/assets/tempimages/product0.jpg',
  // },
];

for (let i = 1; i <= 14; i += 1) {
  products.push({
    ...(i % 4 === 1
      ? emptyProduct
      : i % 4 === 2
      ? product
      : i % 4 === 3
      ? product1
      : product2),
    title:
      i % 4 === 0
        ? 'Chamaedorea Elegans'
        : i % 4 === 1
        ? `Ficus Microcarap 'Green Island' - Weeping Fig - Branched`
        : i % 4 === 2
        ? `Schefflera Arboricola 'Variegata'`
        : 'Cacti',
    id: i,
    image:
      i % 4 === 0
        ? 'https://static.wixstatic.com/media/51a970_86252556f0614bfea4cbb53c00050f9c~mv2.jpg'
        : i % 4 === 1
        ? 'https://dearduck-image-store.s3.amazonaws.com/alocasiabaginda.jpg'
        : i % 4 === 2
        ? 'https://static.wixstatic.com/media/51a970_10db05f6c5d04b1492684b264f2a2e36~mv2.png'
        : 'https://static.wixstatic.com/media/1f3e09_a44a3631f4ad46259a9b00b5a7e9eadd~mv2.jpg',
    // image: `/assets/tempimages/product${i % 9}.${
    //   i % 9 > 2 && i % 9 < 6 ? 'png' : 'jpg'
    // }`,
  });
}

export default products;

export const collections = [];
for (let i = 1; i <= 19; i += 1) {
  collections.push({
    ...product,
    title:
      i % 4 === 0
        ? 'Chamaedorea Elegans'
        : i % 4 === 1
        ? `Ficus Microcarap 'Green Island'`
        : i % 4 === 2
        ? `Schefflera Arboricola 'Variegata'`
        : 'Cacti',
    detail: {
      ...product.detail,
      label: 'Taylor loved this for gameday',
    },
    id: i + 1,
    image: `/assets/tempimages/product${i % 9}.${
      i % 9 > 2 && i % 9 < 6 ? 'png' : 'jpg'
    }`,
  });
}
