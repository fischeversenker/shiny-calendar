const rootStyle = document.documentElement.style;
const computedRootStyle = getComputedStyle(document.documentElement);
const dotRadius = parseInt(computedRootStyle.getPropertyValue('--dot-radius'));
const wrapperElement = document.querySelector('.wrapper');
const wrapperRect = wrapperElement.getBoundingClientRect();

const scaleMouseCoordinate = coord => coord - dotRadius / 2;
const mouseMoveListener = (e) => window.requestAnimationFrame(() => {
  rootStyle.setProperty('--mouse-x', scaleMouseCoordinate(e.clientX - wrapperRect.left));
  rootStyle.setProperty('--mouse-y', scaleMouseCoordinate(e.clientY - wrapperRect.top));
});

const gridChildren = Array.from(document.querySelectorAll('.grid-child'));
const markAllUnselected = () => gridChildren.forEach(gridChild => gridChild.classList.remove('grid-child--active'));
const markSelected = (gridChild) => gridChild.classList.add('grid-child--active');
const gridChildClicked = (e) => {
  if (!e.ctrlKey) {
    markAllUnselected();
  }

  markSelected(e.target);

  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    document.selection.empty();
  }
};

wrapperElement.addEventListener('mousemove', mouseMoveListener);
gridChildren.forEach(gridChild => gridChild.addEventListener('click', gridChildClicked))
