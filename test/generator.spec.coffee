generator = require("../src/generator")
g = generator._exposed

fakeRnd = (list) ->
	pos = -1
	->
		pos = ++pos % list.length
		list[pos]

addVisual = (txt,elem) ->
	div = document.createElement('div')
	div.innerHTML = "##{txt}<br>";

	div.appendChild(elem);
	document.getElementById("pic").appendChild(div);
	
describe "Generator Tests", ->

	describe "Internal methods", ->

		describe "makeColor should", ->

			it "return a mid hsl color ", ->
				color = g.makeColor -> 0.5
				assert.equal color, "hsl( 180, 50%, 50%)"

			it "return the min bright color on 0", ->
				color = g.makeColor -> 0
				assert.equal color, "hsl( 0, 0%, 35%)"

			it "return the max bright color on 1", ->
				color = g.makeColor -> 1
				assert.equal color, "hsl( 360, 100%, 65%)"

			it "return 'random' color", ->
				rvalus = [0.3, 0.4, 0.7]
				color = g.makeColor -> rvalus.pop()
				assert.equal color, "hsl( 251, 40%, 44%)" 

		describe "generateData should", ->

			it "return 15 * 15 data points by default", ->
				data = g.generateData -> 0.5
				assert.equal data.length, 15 * 15

			it "return X * X data points if size X is provided", ->
				data = g.generateData fakeRnd(0.5), 4
				assert.equal data.length, 4 * 4

			it "return true for pixels where rand returns 1", ->
				data = g.generateData -> 1
				assert.ok val for val in data

			it "return false for pixels where rand returns 0", ->
				data = g.generateData -> 0
				assert.notOk val for val in data

			it "return true for pixels where rand returns 0.5", ->
				data = g.generateData -> 0.5
				assert.ok val for val in data

			it "vary when rand does", ->
				data = g.generateData fakeRnd([0, 0.1, 0.4, 0.5, 0.6, 1])
				assert.deepEqual data[0...15], [false, false, false, true, true, true, false, false, false, true, true,
				                                true, false, false, false]

			it "is mirrored over the center on even size", ->
				data = g.generateData fakeRnd([0, 1, 0, 1, 1]), 10
				half = [false, true, false, true, true]
				line = _.flatten([half[0...5], half.reverse()])
				assert.deepEqual data[0...10], line

			it "is mirrored over the center on uneven size", ->
				data = g.generateData fakeRnd([0, 1, 0, 1, 1]), 11
				half = [false, true, false, true, true, false]
				line = _.flatten([half[0...5], half.reverse()])
				assert.deepEqual data[0...11], line

			it "small full matrix", ->
				data = g.generateData fakeRnd([0, 1, 0, 1, 1]), 5
				assert.deepEqual data, [false, true, false, true, false
				                        true, true, false, true, true
				                        true, false, true, false, true
				                        true, false, true, false, true
				                        false, true, true, true, false]


		describe "makeCanvas should", ->
			before ->
				@small = g.generateData fakeRnd([0, 1, 0, 1, 1, 0]), 5
				@medium = g.generateData fakeRnd([0, 1, 0, 1, 1, 0, 0, 0, 1]), 10
				@large = g.generateData fakeRnd([0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1]), 13

			it "return small canvas element (visual #1)", ->
				canvas = g.makeCanvas @small, 5, "#7a4"
				url = canvas.toDataURL() 
				console.log url
				addVisual 1, canvas
				expected = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAV0lEQVRIS2NkwALKV7n8RxfuDNvDiC5GrDoMjSCDiNVMrLpRS8DRQ3RwYVOILTEQG/HY9DKOWoIrTgYuuEZzPEn5ZPgE12hmHHyZkS5xMnyS8KhPSCm7AIbhuAJghnYjAAAAAElFTkSuQmCC"
				assert.equal url, expected

			it "return medium canvas element (visual #2)", ->
				canvas = g.makeCanvas @medium, 5, "#a47" 
				assert.match canvas.toDataURL(), /data:image\/png;base64,/
				addVisual 2, canvas

			it "return @large canvas element (visual #3)", ->
				canvas = g.makeCanvas @large, 5, "#47a"
				assert.match canvas.toDataURL(), /data:image\/png;base64,/
				addVisual 3, canvas

				
	describe "Api methods", ->

		describe "visual tests", ->

			it "color does not change the pattern (visual #4 + #5)", -> 
				addVisual 4, generator "same pattern" 
				addVisual 5, generator "same pattern", color: "green"

			it "scale does not change the pattern (visual #6)", ->
				addVisual 6, generator "same pattern", scale: 4, color: "#ea8"

			it "size does change the pattern (visual #7)", -> 
				addVisual 7, generator "same pattern", size: 11, color: "#a84"

			it "small seed change -> big pattern change (visual #8 + #9)", -> 
				addVisual 8, generator "pattern1", color: "#000" 
				addVisual 9, generator "pattern2", color: "#000"