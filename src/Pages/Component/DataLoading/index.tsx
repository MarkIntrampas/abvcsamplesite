const DataLoading = () => {
  return (
    <div className="dataLoadingContainer">
      <style>{`
        .dataLoadingContainer {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        .dataLoadingBars {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          height: 40px;
        }

        .dataLoadingBar {
          width: 6px;
          height: 100%;
          background-color:white;
          border-radius: 3px;
          animation: dataLoadingStretch 1s ease-in-out infinite;
        }

        .dataLoadingBar:nth-child(1) { animation-delay: -0.4s; }
        .dataLoadingBar:nth-child(2) { animation-delay: -0.3s; }
        .dataLoadingBar:nth-child(3) { animation-delay: -0.2s; }
        .dataLoadingBar:nth-child(4) { animation-delay: -0.1s; }
        .dataLoadingBar:nth-child(5) { animation-delay: 0s; }

        @keyframes dataLoadingStretch {
          0%, 40%, 100% {
            transform: scaleY(0.4);
          }
          20% {
            transform: scaleY(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dataLoadingBar {
            animation: none;
          }
        }
      `}</style>
      <div className="dataLoadingBars">
        <div className="dataLoadingBar"></div>
        <div className="dataLoadingBar"></div>
        <div className="dataLoadingBar"></div>
        <div className="dataLoadingBar"></div>
        <div className="dataLoadingBar"></div>
      </div>
    </div>
  );
};

export default DataLoading;
