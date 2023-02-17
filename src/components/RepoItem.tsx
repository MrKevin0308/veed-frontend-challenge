import { Box, Link, Stack, Typography } from "@mui/material";
import { IGitRepo } from "../../types";
import { Favorite, FavoriteBorder, Star } from "@mui/icons-material";

interface IProps {
  repo: IGitRepo;
  isFav: boolean;
  toggle: () => void;
}

export default function RepoItem({ repo, isFav, toggle }: IProps) {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      px={2}
      py={1}
      borderRadius={4}
      boxShadow="rgb(0 0 0 / 25%) 2px 1px 7px"
      mb={2}
    >
      <Box
        sx={{
          borderRadius: "50%",
          width: 48,
          height: 48,
          overflow: "hidden",
        }}
      >
        <img
          src={repo.owner.avatar_url}
          alt={repo.owner.login}
          width={48}
          height={48}
        />
      </Box>
      <Stack flexGrow={1}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Link href={repo.html_url} target="_blank" variant="h6" flexGrow={1}>
            {repo.full_name}
          </Link>
          <Stack direction="row" sx={{ color: "#F94A29" }}>
            <Star fontSize="small" />
            <Typography variant="body2">{repo.stargazers_count}</Typography>
          </Stack>
          <Box sx={{ cursor: "pointer", color: "#D61355" }} onClick={toggle}>
            {isFav ? (
              <Favorite fontSize="small" sx={{ mt: 0.5 }} />
            ) : (
              <FavoriteBorder fontSize="small" sx={{ mt: 0.5 }} />
            )}
          </Box>
        </Stack>
        <Typography variant="body2">{repo.description}</Typography>
      </Stack>
    </Stack>
  );
}
