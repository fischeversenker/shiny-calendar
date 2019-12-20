const rootStyle = document.documentElement.style;
const computedRootStyle = getComputedStyle(document.documentElement);
const dotRadius = parseInt(computedRootStyle.getPropertyValue('--dot-radius'));
const scale = coord => coord - dotRadius / 2;
const mouseMoveListener = evt => window.requestAnimationFrame(() => {
  rootStyle.setProperty('--mouse-x', scale(evt.clientX));
  rootStyle.setProperty('--mouse-y', scale(evt.clientY));
});

const gridChilds = Array.from(document.querySelectorAll('.grid-child'));
const markAllUnselected = () => gridChilds.forEach(gridChild => gridChild.classList.remove('grid-child--active'));
const markSelected = (gridChild) => gridChild.classList.add('grid-child--active');
const gridChildClicked = (evt) => {
  if (!evt.ctrlKey) {
    markAllUnselected();
  }
  markSelected(evt.target);
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    document.selection.empty();
  }
};

document.documentElement.addEventListener('mousemove', mouseMoveListener);

gridChilds.forEach(gc => gc.addEventListener('click', gridChildClicked))
