randomizer = require("../src/randomizer")

describe "Randomizer Tests", ->
	
	rand = undefined

	describe "should be predictable and", ->
		beforeEach ->
			rand = randomizer("test-seed", 0, 99)

		it "use seed as base", ->
			rand = randomizer("test-seed2", 0, 99)
			assert.deepEqual [77, 67, 57], [rand(), rand(), rand()]

		it "give the same series when initialized with the same seed", ->
			first = [rand(), rand(), rand(), rand()]
			rand = randomizer("test-seed", 0, 99)
			second = [rand(), rand(), rand(), rand()]
			assert.deepEqual first, second

		it "vary even if seed does not", ->
			rand = randomizer("aaaa", 0, 99)
			assert.deepEqual [4, 3, 97], [rand(), rand(), rand()]

		it "return float on 0..1", ->
			rand = randomizer("test-seed", 0, 1)
			value = rand()
			assert value > 0, "greater than 0"
			assert value < 1, "less than 1"

		it "return int on max > 1", ->
			rand = randomizer("expect integer", 0,2)
			value = rand()
			assert.equal value, 1


	describe "should be fair and", ->
		results =
			max: 0
			min: 666
			sum: 0
			map: {}

		iterations = 150000
		before ->
			rand = randomizer("fairness" + Math.random(), 0, 999)
			value = undefined
			i = 0

			while i < iterations
				value = rand()
				results.max = (if results.max < value then value else results.max)
				results.min = (if results.min > value then value else results.min)
				results.map["" + value] = (results.map["" + value] or 0) + 1
				results.sum += value
				i++

		it "respect the borders", ->
			assert.equal 999, results.max, "max"
			assert.equal 0, results.min, "min"


		it "even out the avg", ->
			# allow for 2% error 
			assert Math.abs(results.sum / iterations) - 500 <= 10, "avg"


		it "even out the discrete values", ->
			indexes = {}
			i = 0

			while i < 999
				idx = (results.map[i] / iterations * 1000 * 100) | 0
				indexes["" + idx] = (indexes["" + idx] or 0) + 1
				assert idx > 50, "expect #{i} count : #{results.map[i]} idx #{idx} to be > 50"
				i++ 