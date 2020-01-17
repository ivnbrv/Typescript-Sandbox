const array = [1, 2, 3, 4, 5, 6];

const x = {
  a: 1,
  b: 2
};

// array
let i = 0;
while (i < array.length) {
  console.log(array[i]);
  i++;
}

array.forEach(i => {
  console.log(i);
});

for (i = 0; i < array.length; i++) {
  if (array[i]) {
    console.log(array[i]);
  }
}

for (let i in array) {
  console.log(array[i]);
}

for (let i in x) {
  console.log(i);
}
