function overview(text) {
  if (text.length > 200) {
    const shortText = text.slice(0, 200).split(' ').slice(0, -1);
    return shortText.concat(['...']).join(' ');
  }

  return text;
}

export default overview;
