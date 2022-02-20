var _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    const reducer = (sum, item) => {
        return (sum + item)
    }

    return blogs.length === 0
        ? 0
        : blogs.map(blog => blog.likes).reduce(reducer, 0)

}

const favoriteBlog = (blogs) => {

    if (blogs.length === 0) return undefined

    const arr = blogs.map(blog => blog.likes)
    const maxIndex = arr.indexOf(Math.max.apply(null, arr))
    const mostLikes = blogs[maxIndex]
    // console.log(maxIndex)
    // console.log(mostLikes)
    return {
        title: mostLikes.title,
        author: mostLikes.author,
        likes: mostLikes.likes,
    // }
    }

}

const mostBlogs = (blogs) => {

    if (blogs.length === 0) return undefined
    // console.log('blogs is:', blogs)
    const grouped = _.groupBy(blogs, blog => blog.author)
    // console.log('grouped is: ', grouped)
    // console.log('grouped[0] is', grouped[0])

    // Object.keys(grouped) // get the keys
    // const
    const blogsPerAuthor = []

    for (var key of Object.keys(grouped)) {
        // console.log('The key - object pair is: ', key, grouped[key])
        // console.log(grouped[key])
        blogsPerAuthor.push( {
            author: key,
            blogs: grouped[key].length,
        })
        // console.log('blogsPerAuthor is in the loop: ', blogsPerAuthor)
    }
    // console.log('blogsPerAuthor is: ', blogsPerAuthor)

    return blogsPerAuthor.slice().sort((author1, author2) => author2.blogs - author1.blogs)[0]

}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return undefined
    // console.log('blogs is:', blogs)
    const grouped = _.groupBy(blogs, blog => blog.author)
    // console.log('grouped is: ', grouped)
    // console.log('grouped[0] is', grouped[0])

    // Object.keys(grouped) // get the keys
    // const
    const likesPerAuthor = []

    for (var key of Object.keys(grouped)) {
        // console.log('The key - object pair is: ', key, grouped[key])
        // console.log(grouped[key])
        likesPerAuthor.push( {
            author: key,
            likes: grouped[key].map(author => author.likes).reduce((partialSum, a) => partialSum + a , 0),
        })
        // console.log('blogsPerAuthor is in the loop: ', blogsPerAuthor)
    }
    // console.log('blogsPerAuthor is: ', blogsPerAuthor)

    return likesPerAuthor.slice().sort((author1, author2) => author2.likes - author1.likes)[0]
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
}