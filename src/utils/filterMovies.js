function filterMovies(list, shortMovies, search) {
    return list.filter(item => item.nameRU.toLowerCase().includes(search.toLowerCase()) && (shortMovies ? item.duration <= 40 : true))
}
export default filterMovies;