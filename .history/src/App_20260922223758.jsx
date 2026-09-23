  // Tag counts based on the current view (all vs archived)
  const tagCounts = {};
  viewFiltered.forEach((b) => {
    b.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  const tagsWithCounts = Object.keys(tagCounts)
    .sort()
    .map((name) => ({ name, count: tagCounts[name] }));

  const visibleBookmarks = sorted;

  return (
    <div className="app">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <div className="app-body">
        <Sidebar
          currentView={currentView}
          onChangeView={setCurrentView}
          tags={tagsWithCounts}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
        />
        <main className="app-main">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <SortSelect sortOption={sortOption} onSortChange={setSortOption} />
          <button onClick={openAddModal}>+ Add Bookmark</button>

          {isLoading ? (
            <p>Loading bookmarks...</p>
          ) : (
            <BookmarkList
              bookmarks={visibleBookmarks}
              onEdit={openEditModal}
              onDelete={handleDeleteBookmark}
              onTogglePin={handleTogglePin}
              onToggleArchive={handleToggleArchive}
              currentView={currentView}
              searchTerm={searchTerm}
            />
          )}
        </main>
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <BookmarkForm
            key={editingBookmark ? editingBookmark.id : "new"}
            initialData={editingBookmark}
            onSave={editingBookmark ? handleUpdateBookmark : handleAddBookmark}
          />
        </Modal>
      )}
    </div>
  );