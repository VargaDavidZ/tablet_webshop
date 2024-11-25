-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: localhost
-- Létrehozás ideje: 2024. Nov 25. 13:20
-- Kiszolgáló verziója: 10.4.21-MariaDB
-- PHP verzió: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `webbolt`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tablets`
--

CREATE TABLE `tablets` (
  `id` int(11) NOT NULL,
  `title` varchar(1000) NOT NULL,
  `op_sys` varchar(1000) NOT NULL,
  `cpu_hz` int(11) NOT NULL,
  `cpu_cores` int(11) NOT NULL,
  `screen_size` varchar(1000) NOT NULL,
  `screen_res` varchar(1000) NOT NULL,
  `ram` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `tablets`
--

INSERT INTO `tablets` (`id`, `title`, `op_sys`, `cpu_hz`, `cpu_cores`, `screen_size`, `screen_res`, `ram`, `description`, `price`) VALUES
(1, 'myTitle', 'myOPSys', 10, 5, '19', '1920x1080', 16, 'desc', 1000),
(3, 'asdasddasd', 'asdasda', 12, 1231313, 'dia', 'asd', 123, 'asd', 123213),
(12, 'title', 'sys', 12, 12, 'size', 'res', 12, 'desc', 1000),
(13, 'asd', 'asd', 12, 12, 'se', 'res', 12, 'asdsad', 1010),
(17, 'sdf', 'sdf', 12, 12, 'asd', 'asd', 12, 'sad', 12),
(18, 'f', 'd', 12, 12, 'd', 'd', 12, 'asd', 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `tablets`
--
ALTER TABLE `tablets`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `tablets`
--
ALTER TABLE `tablets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
