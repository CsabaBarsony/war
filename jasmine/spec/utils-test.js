describe('utils', function() {
  describe('distance', function() {
    const dataList = [
      {
        points: [new Point(10, 10), new Point(10, 20)],
        result: 10,
      },
      {
        points: [new Point(10, 10), new Point(20, 20)],
        result: Math.pow(2, 0.5) * 10,
      },
      {
        points: [new Point(20, 20), new Point(10, 10)],
        result: Math.pow(2, 0.5) * 10,
      },
    ]

    it('should calculate distance between 2 points', function() {
      dataList.forEach(data => {
        expect(utils.distance(data.points[0], data.points[1])).toBe(data.result)
      })
    })
  })
})