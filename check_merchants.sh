#!/bin/bash
# read merchants.yml and write all urls to url-list.txt
cat public/merchants.yml | grep http | awk '{print $2}' | sed 's/\"//g' >| url-list.txt

# hit each url and print out status
# from: https://stackoverflow.com/a/6136861/334545
while read LINE; do
  curl -o /dev/null --silent --head --write-out "%{http_code} $LINE\n" "$LINE"
done < url-list.txt
