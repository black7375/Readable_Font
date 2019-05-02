#!/bin/bash
font_subset()
{
    file=$1
    fontName=${file:0:-4}
    format=${file: -3}
    pyftsubset "$file" \
               --flavor="woff2" \
               --with-zopfli \
               --output-file="../subset-fonts/$fontName.woff2" \
               --text-file="../korean2574.txt" \
               --layout-features='*' \
               --glyph-names \
               --symbol-cmap \
               --legacy-cmap \
               --notdef-glyph \
               --notdef-outline \
               --recommended-glyphs \
               --name-legacy \
               --drop-tables= \
               --name-IDs='*' \
               --name-languages='*'
}

echo -e "--------------------"
echo -e " Font Subset woff2"
echo -e "--------------------\n"

echo -e "\n--------------------"
echo -e "NEEDS"
echo -e "pip install fonttools"
echo -e "pip install zopfli => --with-zopfli for woff"
echo -e "pip install brotli => for woff2"

echo -e "\n--------------------"
echo -e "OTF Files Trans\n"
cd otf

echo -e "\nNoto Sans"
font_subset NotoSansCJKkr-Thin.otf
font_subset NotoSansCJKkr-Light.otf
font_subset NotoSansCJKkr-DemiLight.otf
font_subset NotoSansCJKkr-Regular.otf
font_subset NotoSansCJKkr-Medium.otf
font_subset NotoSansCJKkr-Bold.otf
font_subset NotoSansCJKkr-Black.otf

font_subset NotoSansMonoCJKkr-Regular.otf
font_subset NotoSansMonoCJKkr-Bold.otf

echo -e "\nNoto Serif"
font_subset NotoSerifCJKkr-Black.otf
font_subset NotoSerifCJKkr-Bold.otf
font_subset NotoSerifCJKkr-ExtraLight.otf
font_subset NotoSerifCJKkr-Light.otf
font_subset NotoSerifCJKkr-Regular.otf
font_subset NotoSerifCJKkr-Medium.otf
font_subset NotoSerifCJKkr-SemiBold.otf

echo -e "\nKoPub Batang"
font_subset KoPub-Batang_Pro-Light.otf
font_subset KoPub-Batang_Pro-Medium.otf
font_subset KoPub-Batang_Pro-Bold.otf

echo -e "\nNanum Gothic"
font_subset NanumGothic.otf
font_subset NanumGothicBold.otf
font_subset NanumGothicExtraBold.otf


cd ..
echo -e "\n--------------------"
echo -e "TTF Files Trans\n"
cd ttf

echo -e "Gothic A1"
font_subset GothicA1-Thin.ttf
font_subset GothicA1-ExtraLight.ttf
font_subset GothicA1-Light.ttf
font_subset GothicA1-Regular.ttf
font_subset GothicA1-Medium.ttf
font_subset GothicA1-SemiBold.ttf
font_subset GothicA1-Bold.ttf
font_subset GothicA1-ExtraBold.ttf
font_subset GothicA1-Black.ttf

echo -e "\nNanum Gothic Coding"
font_subset NanumGothicCoding.ttf
font_subset NanumGothicCoding-Bold.ttf

echo -e "\nD2 Coding"
font_subset D2Coding-Ver1.3.2-20180524.ttf
font_subset D2CodingBold-Ver1.3.2-20180524.ttf
cd ..

echo -e "\n--------------------"
echo -e " Font Subset END"
echo -e "--------------------\n"
