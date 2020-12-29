const fs = require('fs');

const input = fs.readFileSync('test.txt', 'utf-8')
    .trim()
    .split('\n\n')
    .map(el => {
        const [tile, ...imageList] = el.split('\n');
        const tileValue = tile.replace(/[a-z\s®:]/gi, '')

        return {
            id: Number(tileValue),
            imageList,
        }
})

const getTopBorder = (images) => images[0];
const getBottomBorder = (images) => images[images.length - 1];

const getRightBorder = (images) => images.reduce((acc, cur) => acc += cur[cur.length - 1], '');
const getLeftBorder = (images) => images.reduce((acc, cur) => acc + cur[0], '')

const getBorders = (images) => ({
    leftBorder: getLeftBorder(images),
    rightBorder: getRightBorder(images),
    topBorder: getTopBorder(images),
    bottomBorder: getBottomBorder(images),
})

const sides = {
    left: 'LEFT',
    right: 'RIGHT',
    top: 'TOP',
    bottom: 'BOTTOM',
}

const checker = (side, tile, checkedTile) => {
    const {id, imageList} = checkedTile;
    const {
        leftBorder,
        rightBorder,
        topBorder,
        bottomBorder,
    } = getBorders(imageList);
    switch (side) {
        case sides.bottom: {

        }
        case sides.top: {

        }
        case sides.left: {

        }
        case sides.right: {

        }
    }
}

const doMagic = (tile, arr) => {
    const {
        leftBorder,
        rightBorder,
        topBorder,
        bottomBorder,
    } = getBorders(tile.imageList);

    let result = {}

    const xx = arr.map(checkedTile => {

        return {
            left: checker(sides.left, tile, checkedTile),
            right: 'RIGHT',
            top: 'TOP',
            bottom: 'BOTTOM',
    }
    })


    return xx;
}

const getBorders = (arr) => arr.map((tile, i, arr) => doMagic(tile, arr));


console.log(getBorders(input));