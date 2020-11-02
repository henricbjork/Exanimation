export const clearSearchField = () => {
  const searchField = document.querySelector('.search-field');

  // trigger an onChange event after emptying the input text
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value'
  ).set;
  nativeInputValueSetter.call(searchField, '');
  const event = new Event('input', { bubbles: true });
  searchField.dispatchEvent(event);

  // unfocus the input field
  searchField.blur();
  return;
};
