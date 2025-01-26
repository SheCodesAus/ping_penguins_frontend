import React from 'react';

const StickyNote = ({ text, author }) => {
  return (
    <article className="sticky-note">
      <div className="article-heading">
        <p className="note-text">{text}</p>
        <p className="note-author">{author}</p>
      </div>
    </article>
  );
};

export default StickyNote; 