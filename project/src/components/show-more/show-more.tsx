function ShowMore(props: {
  loadMore: () => void;
}):JSX.Element {

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={props.loadMore}>Show more</button>
    </div>
  );
}

export default ShowMore;
