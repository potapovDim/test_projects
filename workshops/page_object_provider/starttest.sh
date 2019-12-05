#

now_bad=$(date +"%T")
echo $now_bad

npm run test:bad

after_bad=$(date +"%T")
echo $after_bad

now_good=$(date +"%T")
echo $now_good

npm run test:good

after_good=$(date +"%T")
echo $after_good

