import sys, os, zipfile

files_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../'))
files = os.listdir(files_path)

packables = ["icon128.png", "icon16.png", "icon48.png", "main.js", "manifest.json", "userMarkerStyle.css"]

release = "releases/release-%s.zip" % str(sys.argv[1])
release_path = os.path.join(files_path, release)
release_pack = zipfile.ZipFile(release_path, "w")

for file in files:
	if file in packables:
		release_pack.write(file)

release_pack.close()
