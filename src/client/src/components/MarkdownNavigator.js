import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MarkdownNavigator = ({
  openModal,
  refreshFetching,
  setRefreshFetching,
}) => {
  const [routes, setRoutes] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch(
          `https://bee-api-markdown-rvo6c.ondigitalocean.app/api/routes`
        );
        const data = await response.json();
        setRoutes(data.routes);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
      setRefreshFetching(false);
    };

    fetchRoutes();
  }, [refreshFetching, setRefreshFetching]);

  const buildTree = (paths) => {
    const tree = {};

    paths.forEach((path) => {
      const parts = path.split("/");
      let current = tree;

      parts.forEach((part, index) => {
        if (!current[part]) {
          current[part] = index === parts.length - 1 ? null : {};
        }
        current = current[part];
      });
    });

    return tree;
  };

  const tree = buildTree(routes);

  const handleNavigation = (folder) => {
    setCurrentPath((prev) => [...prev, folder]);
  };

  const handleBack = () => {
    setCurrentPath((prev) => prev.slice(0, -1));
  };

  const getCurrentLevel = (tree, pathArray) => {
    return pathArray.reduce(
      (current, part) => (current ? current[part] : null),
      tree
    );
  };

  const currentLevel = getCurrentLevel(tree, currentPath);

  return (
    <div className="w-full flex flex-row justify-between">
      <div className="flex flex-row items-baseline">
        {currentPath.length > 0 && <button onClick={handleBack}>⬅ Back</button>}
        <ul className="flex flex-row items-baseline">
          {currentLevel &&
            Object.entries(currentLevel).map(([name, value]) => (
              <li key={name} className="px-5">
                {value ? (
                  <button onClick={() => handleNavigation(name)}>
                    {name}/
                  </button>
                ) : (
                  <Link to={`/${[...currentPath, name].join("/")}`}>
                    {name}
                  </Link>
                )}
              </li>
            ))}
        </ul>
      </div>
      <button onClick={() => openModal()}>Generate New Directory</button>
    </div>
  );
};

export default MarkdownNavigator;
