import React from "react";

const ProtectedView: React.FC = () => {
  return (
    <section className="flex items-center justify-center w-full h-full mt-48">
      <h1 className="text-5xl">Only Authorized Users Can See This</h1>
    </section>
  );
};

export default ProtectedView;
