export const courseSchema = {
  id: { column: 0, transform: String },
  name: 1,
  description: 2,
  tag: 3,
  place: 4,
  isPublished: {
    column: 5,
    transform: (value) => value === 1 || value === "1",
  },
  image: 6,
};
