import React from "react";

const PageLayout = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md p-4">
        <h1 className="text-xl font-semibold">{title}</h1>
      </header>

      {/* Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default PageLayout;
