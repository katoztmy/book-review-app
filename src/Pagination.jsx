export const Pagination = ({ offset, onPrevious, onNext }) => {
  return (
    <div className="flex justify-center mt-6">
      {offset !== 0 && (
        <button
          className={`mr-4 px-4 py-2 rounded text-white font-bold`}
          onClick={onPrevious}
        >
          前へ
        </button>
      )}
      <button
        className="px-4 py-2 bg-gray-200 rounded text-white font-bold"
        onClick={onNext}
      >
        次へ
      </button>
    </div>
  );
};
