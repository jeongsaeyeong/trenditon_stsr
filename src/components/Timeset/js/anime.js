const transition = { duration: 1, ease: [0.76, 0, 0.24, 1] }

export const height = {
    initial: {
        height: 0
    },
    enter: {
        height: "220px",
        transition
    },
    exit: {
        height: 0,
        transition
    }
} 
