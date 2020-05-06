const MIN_WIDTH = 1;
const MAX_WIDTH = 1200;

const MIN_HEIGHT = 1;
const MAX_HEIGHT = 1200;

const MIN_BORDER_WIDTH = 0;
const MAX_BORDER_WIDTH = 20;

const widthInput = document.querySelector("#width");
const heightInput = document.querySelector("#height");
const borderWidthInput = document.querySelector("#border-width");
const borderColorInput = document.querySelector("#border-color");
const altTextInput = document.querySelector("#alt-text");

const applyButton = document.querySelector("#apply-button");

function applyChanges(width, height, borderWidth, borderColor, altText) {
    const image = document.querySelector("#image");

    image.width = width;
    image.heigt = height;
    image.alt = altText;
    image.style.border = `${borderWidth}px solid ${borderColor}`;
}

function checkWidth(width) {
    return width && width >= MIN_WIDTH && width <= MAX_WIDTH;
}

function checkHeight(height) {
    return height && height >= MIN_HEIGHT && height <= MAX_HEIGHT;
}

function checkBorderWidth(borderWidth) {
    return borderWidth && borderWidth >= MIN_BORDER_WIDTH && borderWidth <= MAX_BORDER_WIDTH;
}

function checkBorderColor(borderColor) {
    return borderColor && /^(#[0-9abcdef]{6}|[a-z]+)$/.test(borderColor);
}

function checkAltText(altText) {
    return altText && /^[\w ]+$/.test(altText);
}

function toggleInvalidClass(input, isValid) {
    if (isValid) {
        input.classList.remove('is-invalid')
    } else {
        input.classList.add('is-invalid')
    }
}

applyButton.addEventListener('click', (e) => {
    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);
    const borderWidth = parseInt(borderWidthInput.value);
    const borderColor = borderColorInput.value.toLowerCase();
    const altText = altTextInput.value;

    const widthValid = checkWidth(width);
    const heightValid = checkHeight(height);
    const borderWidthValid = checkBorderWidth(borderWidth);
    const borderColorValid = checkBorderColor(borderColor);
    const altTextValid = checkAltText(altText);

    toggleInvalidClass(widthInput, widthValid);
    toggleInvalidClass(heightInput, heightValid);
    toggleInvalidClass(borderWidthInput, borderWidthValid);
    toggleInvalidClass(borderColorInput, borderColorValid);
    toggleInvalidClass(altTextInput, altTextValid);

    const valid = widthValid && heightValid && borderWidthValid && borderColorValid && altTextValid;

    if (valid) {
        applyChanges(width, height, borderWidth, borderColor, altText)
    }
});