// const goods = [
//     { title: 'Title 9', price: 96, sellNumber: 314, favorRate: '4.17' },
//   ];

function generateUniqueArray(length) {
  const uniqueArray = [];
  const titles = [
    'Title 1',
    'Title 2',
    'Title 3',
    'Title 4',
    'Title 5',
    'Title 6',
    'Title 7',
    'Title 8',
    'Title 9',
    'Title 10'
  ];

  while (uniqueArray.length < length) {
    const randomIndex = Math.floor(Math.random() * titles.length);
    const randomTitle = titles[randomIndex];

    const object = {
      title: randomTitle,
      price: Math.floor(Math.random() * 100) + 1,
      sellNumber: Math.floor(Math.random() * 1000) + 1,
      favorRate: (Math.random() * (5 - 1) + 1).toFixed(2)
    };

    if (!uniqueArray.some((item) => item.title === randomTitle)) {
      uniqueArray.push(object);
    }
  }

  return uniqueArray;
}
const goods = generateUniqueArray(10);

export default  goods
