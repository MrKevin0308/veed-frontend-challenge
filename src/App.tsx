import React from "react";
import {
  Box,
  Typography,
  Tab,
  Container,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ToastContainer, toast } from "react-toastify";
import { IGitRepo, TTabValue } from "../types";
import RepoItem from "./components/RepoItem";

import "react-toastify/dist/ReactToastify.css";

const STORAGE_KEY = "veed_io_storage_key";

function App() {
  const [allRepos, setAllRepos] = React.useState<IGitRepo[]>([]);
  const [favRepos, setFavRepos] = React.useState<IGitRepo[]>([]);
  const [tabIndex, setTabIndex] = React.useState<TTabValue>("all");
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    getData();
  }, []);

  // Fetch github repositories' info from github api and favourite repo list from localStorage
  const getData = async () => {
    setLoading(true);
    try {
      const list = await (
        await fetch(
          "https://api.github.com/search/repositories?q=created:>2017-01-10&sort=stars&order=desc"
        )
      ).json();
      setAllRepos(list.items);

      const favList = localStorage.getItem(STORAGE_KEY);
      if (favList) setFavRepos(JSON.parse(favList));
    } catch (error) {
      console.log(error, "Error on getData()");
      toast.error("Something went wrong while fetching data");
    } finally {
      setLoading(false);
    }
  };

  // Save favourite repo list to localStroage
  const saveFavData = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favRepos));
  };

  // Toggle Favourite selection of item
  const toggleFavSelection = (repo: IGitRepo) => {
    const sIndex = favIndex(repo);
    if (sIndex > -1) {
      favRepos.splice(sIndex, 1);
      setFavRepos([...favRepos]);
    } else {
      favRepos.push(repo);
      setFavRepos([...favRepos]);
    }
    saveFavData();
  };

  const favIndex = (repo: IGitRepo) => {
    return favRepos.findIndex((item) => item.id === repo.id);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" color="Highlight" textAlign="center" mb={4}>
        Github repositories
      </Typography>
      <TabContext value={tabIndex}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={(e, newValue: TTabValue) => setTabIndex(newValue)}
            aria-label="lab API tabs example"
          >
            <Tab label="All Repos" value="all" />
            <Tab label="Favourite Repos" value="fav" />
          </TabList>
        </Box>
        <TabPanel value="all">
          {allRepos.map((repo) => (
            <RepoItem
              key={repo.id + "all"}
              repo={repo}
              isFav={favIndex(repo) > -1}
              toggle={() => toggleFavSelection(repo)}
            />
          ))}
        </TabPanel>
        <TabPanel value="fav">
          {favRepos.map((repo) => (
            <RepoItem
              key={repo.id + "all"}
              repo={repo}
              isFav={favIndex(repo) > -1}
              toggle={() => toggleFavSelection(repo)}
            />
          ))}
        </TabPanel>
      </TabContext>

      <ToastContainer />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

export default App;
