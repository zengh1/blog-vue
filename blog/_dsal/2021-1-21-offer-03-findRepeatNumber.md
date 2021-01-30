---
title: 剑指 Offer 50. 第一个只出现一次的字符（书中为35题）
data: 2021-1-28
tags: 
  - 字符串
  - 哈希表
author: zz
location: Beijing
---



> 
> 在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。
>
> **示例:**
>
> ```
> s = "abaccdeff"
> 返回 "b"
> 
> s = "" 
> 返回 " "
> ```
>
> 
>
> **限制：**
>
> ```
> 0 <= s 的长度 <= 50000
> ```



####  方法1：哈希表

可以将哈希表的 key 定义为 char，用来存储 string 的每个字符；value 定义为 int ，用来记录字符出现的次数，或者定义为 bool，用来标识字符是否重复出现，因为 bool 的方式相对简单明了，也并不需要频繁对变量进行自增操作，所以这里选择 bool，false 代表未重复出现。

由于 go 的 map 是无序的，遍历出的第一个 value 为 false 的字符，在字符串中未必是第一个，所以只能通过二次遍历字符串，判断每个字符在 map 中对应的值，并返回第一个值为 false 的字符。 

代码如下：

```go
func firstUniqChar(s string) byte {
    m := make(map[rune]bool)
    for _, char := range s {
        if _, ok := m[char]; ok {
            m[char] = true
            continue
        }
        m[char] = false
    }

    for _, char := range s {
        if !m[char] {
            return byte(char)
        }
    } 
    return 32
}

// 执行用时: 48 ms
// 内存消耗: 5.3 MB
```





#### 方法2：使用数组代替哈希表

这是 《剑指offer》 中提供的方法，虽然哈希表可以很好地解决问题，但是对于一个只有小写字母的字符串来说（题目中说明了）来说，杀鸡焉用宰牛刀，可以用一个长度为 26 的数组，建立一个简单的哈希表即可，用字符的 ascii 减去 97 作为下标，值为出现的次数，代码如下：

```go
func firstUniqChar(s string) byte {
    n := [26]int{}
    for _, char := range s {
        n[char-97]++
    }

    for _, char := range s {
        if n[char-97] == 1 {
            return byte(char)
        }
    } 
    return 32
}

// 执行用时: 8 ms
// 内存消耗: 5.3 MB
```

执行用时只有原来的 1/6，这个结果可能不是很准确，但是相对哈希表而言，少了哈希计算、处理哈希冲突等等操作，效率肯定要好一些的。通过这道题也使我明白了，不要无脑使用 map，在一些特殊条件下，往往会有更简单高效的解决方法。





#### 方法 3： 有序哈希表

如果哈希表有序，则可以遍历哈希表，找到第一个值为 fasle 的字符，但 go 中没有提供有序 map，所以这里使用一个 slice 来按顺序保存 key ，之后遍历这个 slice 即可，代码如下：

```go
func firstUniqChar(s string) byte {
    sli := make([]rune, 0)
    m := make(map[rune]bool)

    for _, char := range s {
        // map 中没有该 char，则 append 到 slice 中
        if _, ok := m[char]; !ok {
            sli = append(sli, char)
        }
        if _, ok := m[char]; ok {
            m[char] = true
            continue
        }
        m[char] = false
    }
	
    // 遍历 slice
    for _, char := range sli {
        if m[char] == false {
            return byte(char)
        }
    } 
    return 32
}

// 执行用时: 48 ms
// 内存消耗: 5.3 MB
```

不过该方法看起来并没有显著提高效率。





####  错误记录

```go
func firstUniqChar(s string) byte {
  	// 这里错误的将 value 设置为 byte 类型，最大值只有 255，255 + 1 会被重置为 0
  	// 也就是说如果一个数出现了 257 次，则它的值会变为 1
    n := [26]byte{}
    for _, char := range s {
        n[char-97]++
    }

    for _, char := range s {
        if n[char-97] == 1 {
            return byte(char)
        }
    } 
    return 32
}


```



例如下面这个刁钻的测试用例，它的正确结果应该是 "y"，但是上面的代码却返回了 "n"，原因就是 n 出现了 257 次，值变为了 1，而字符串中 n 又比 y 先出现，导致错误地返回了 n。

```
"uindrseqbljlhqvlwvgdebeihttirikuahlikgnahvgnptmqwbovmuwesxkvcitcwrwrucsbbfqvldridfviduqvmfcmeiphoqupbitnwdbvevouoaetisdmgvvvwoglwtgjrpcbghxkrkjthetxeexbphbjiehaicuicgnirslhdstgmqcdnlulpdpadjdltfouwhfqicfcqntnpeqaohslwkhbvflxaudembsrsindluthxapnmrqinsivbxmkohubvmmmpmklbfrmeuvdrhptdmelmjjefgbsqqlbqhvsmswwxrlkutadqbbeisbgfrcivvoxmxxptrscxnjjvtajfhqiucdihihcutxhlonlomfdnbwanrcnbarojsajseqrgkuqgkcnvrghxnmbclfomktwfaakodeecsglufvobkgoqsbrhdiuhxqbcndkmxuertupngvnkgwrfwgdbiurbooxariklwarjgavsuddoveipltessrssxwxgvrrtkisnbavkbpaphicxhapjjpkccakepuafjdaswfwfmbdmuuaveukxvnpkgmhcjcpqntssthjlvrngugbhrivtwmbrvrprrlfmvwjdkonfmgnepqoxwfcvefjihisarwskjfmqrjlkbbugfawmkqgfxgpokkxxivqbqimwsccdekjegwcxhmmuhpstxfpofwmrmhrxeptxwbvxsesheijjfsshgrrwckjkmbslpbngnwhokjnujtiepfrdhiwwgbffixaidabacaibummwxgxowsewlqfxrkarjrkqxmxwobqbcoowmbggtpoqadhqdxlhvxrkfuwpxxgnchudreoeuefkqhlrmwwfvjexvbxdhtdngwvoohpjtdbdbesceiafrhenfljleegsencfmbauxlltfueudnjxsiiggsfwiuidgktsbtcvxtdllviocfdbonjciosucbjidwxnogmnveqkcrxbpamfxwxiugjgrfpstromuxxdiodqeoqdlfulttraquskhwfholbrcbchijlgqvuwxvejedikvgetlmrcmeampdgjvmbdovkcjilbralhmniwvbeandldnudkpjvhoqtfdwllridwljfvflfdrbqadvabggwsiexrthrngexpebuhtefkqgkkjoopsmunesfotsprxuaswwenhkdvsspkppulecahkkvccqngeaoijjgvsfqfpvphvhdnkkcqsebhijkvfpqjmarbkpejagtbtisnflrrvawmvfxeccxtrmorihgslxlqrqcmouojjfhcieuwlrcqhevmveookgonxqdbtgqjimsidnaaiuchwkfkpxfptuvhfqemojixqvhgokdekdwbomptqqlfiaiptxvgfmovdqxupjxjpoxuplsagxpgpmvtcpawkrrthvclhdbpqeucchxptdceswhnqocmeocpgthkgxmxggwlnantwwuoqpmnpvgateitxlocmhnihmfgjnvrggenbhnjfubtoteojojjkjpcnwqthxhlfukingjletwnxdnjwrgjopqoxtqcvwsakqxxumbtcblufdmdvxfkshitenmenkxjvblsoiyhjpakinimwxhcebabgsvqftfvwjnstltjawhwipkubadtoxqrutkwxjnmfoowtnvqplvqokcuwlkmxxhboampcdwokjfxggtnojebagxlwaeowtomubtbfsrufkttugfpnxmipkcsphqafjuxovwpcgonhiqmomsweunoeqkpkxxsdksmufowqpmkontccckcdbwrfwamikananakgjkahndrepemcgxecgpltvdbpoexemnrejdephuuxhfcubxlbdrmhvmeqmtdhnbkwnidigxdantmkckijiecavkpumegrbveffclcltmibjcstrrauphfxxssgxkkirapiihnlbrodvfostahqdkajqtrrfwdsemwxlucbbjjspnnqjnpnpmimhulgoskwpsactexmkfdhaihnlggqeunqevxfrpiwskhrhgfluelshqejavomjshfomvgpugqesbtakvxqwrtguuebcgqphocglfrircfvuikfbviomfrsnpvvlftwrkbmjpvdpgvohtmxcxwnuhwojnfvsfwvdlaxxlmafihpussffcawjpaxdwerwfbvsbipljualcnhseealvqiqfiaiskaafufaubvhjglktfhbdsaskmedroxkrxshnggumcbtdcablawkodmnafkjekuiecqlvbxocfcwipaicgndfafjhtjcelakrecmntjxeqjqgxkxapuobbcaxfrpsktjswxdfvugmmgjwiphnsclqwmranthpiueffaxvhplajqsrtoxbixbdpcfkbpkjkelemubwachcpxcniaqmkmasmvlfcubcdkxfkupgcgbrvmbmgnjgfbawmmdritdrkppswatwtdjemhifhmshunkvaivhteqnwkdcrpfxmrafupfhbgligbvrqjkvcgbiqudvtblhfgetffduvsfhsmjimgruxrvbqniluapaoniwhqhltbxvrphmlisfaomqoecmdbbrgujgsbdelkbddcgmpggogfonssxisphbwljlvhwhewmpqugxgbubqfeilobxxhtcxmxvjtbuavxlaghhjiemihvrsjxbleutpuumgndtnocwkpkdaupbmcsahcbwoelmgnwqummmekwhpahtdvehoprfcciwqphfwppscruimikiximhbkdomovbdalsihioncpaclevxawqcqthtmuogolkrvlipropmnmecttmlecpapdlrcqxopfjobgsvhcadqiudqjoscpvjguddnorldkpqtoocrtkcutkvdpbkkekenpqjmxmuxccamkwwxrdrbdmameptvcgsltqdasicoouvdtbranexokmtkioptqblrruaihvfvvebjigkuwwgearxvmimlgmxgpvbnotepprknjxcunheclsvxxmmoufvdhrwxqlrkmvcaxtbiqrjrnrsfrkvttnpxbspnetcofhpcbcphrchivnrskkalsvdllhtisnaerxbcxutcpmnquwrutmmvrtchhheplhdmbfkrrrxalosjbebtdqtsjbdcuuatgldnubigijbkehxsmhsadwtcbwinlnilthiqslvsduspkjuunpetcofujbqhtkmalnjmllhulckqodbgffxdiqjajecbmlekvepkirxnguqnpnfjdptinuphcoxkoqhqrmkkawmngqwvfpcuxgpekkprupplsbwshmsduaitlhcjargacduewtqgnxbtpwrkawpncarxlsnardkftmsdjflmhoplghandjisupacixxthwokctbxekqwbmhtoutgrogxsdnmcaqrsqrpigbigqhsmrksxgkdbdbxkwimpehltcffuhrphbaqgvabjduudbrxgwiljkwijvaugnleamskjijhnvcspagsfnhjielrvxddxqfgaipfflffksmvgaioaclfsjhovcotoaiwhhnmrudsqmsepsgdofnxjjcgdejutmdtgauuvuepajlikebtpgfimudswplfwgaodtwqjuaujlbqqartevsqesmrpknoanfprqcwochqdrcvquovtsogptduvfiaislfvpxwsqitodxwckprpfxtqhbdixklhtsajqgbinfpdqaehrwhnwggmggnbstolrcbmlhpfjurbknpwbrfhvdanrjcwnvsxudagbkhdlwujqvwpbbgmsfrkgutkqwxqfemaaokrfdocsbbktwaugoadgvqcdhmqkworbvxqwdpmbjkqghmapevrsnaaparwnbvcfnhhgfqplfwiswrxxistamulcbxcmvkbcxsgftbmbvqlxrhbmcujkktdvcgnjkfaclxndtjkdbgqvbqxicgmpowbjsfvspvxtrovjwbbkaapfgcqbifdosnmutvfbgdmhiqvflasedhafqnmrlmwbuhmptnkvvojnjngiepmdktewwsuxernpfmktsgwwnxfvmuotpfxfntcrsjpldmringfpkpievvbgbghevlmuticukrfvahrmtkvckjbxxrmkilbeojsxgbvbhsgvkhgtjddoreipbkwiqbkecobfexswiwttlohnfwokixfmfrpadtudrssiobbvhctpbeesiogwhdqojoalxpxikwuheilvsrxbfbnckjeswhkfviihvwrfxkxcomhvsjojhltospooumkstqqnvxmrowlrtufhxkipxnfecchklrqljfwnglxeharemawsbvnuentnapewjhnzbieisjtomdqtjkigisgopmgcfqxcxninrisupchhmfrosxgdtakhrrnbbnxovvbfjgwdgnlxoxswhsfjeijvivqemoekkmrttscthlpglaorarhibrucuhikfkphqmhowloobeumlikqmmlatesupiekwjhdvntnjbakohrbobimmujkbatfxpmgfmmqsgwsffcbenwgdrhlqrsmfghevnjfdlxupihmkptsefubmixhacnxngpjrckxhvhrelolqwevoqklhxbplakmsxdetvpuddmvaodpglmsknbvfftstckjurbntwqenuhcurxqvotrxfpootqkobeatoduihwhpjxxrvboggkcxagnrrfwfuaqplirlnafprumnkcjxlpvanfmqwuoaupqptqeulpwvnhbahbkihustenkbdushjakemufdhjllnowmvgpdxbrhxfonpgcjslvwgdmajicqqmdxubrofvdodfsedjghpbjncgkckeudxwascljlraoodwvgpvojcqgbalntslsfrwnfcdvidsdrvwhscskpalubxeobapkgpdsqcjpwkednraijmbcreplwijofniggavpdlwfmwnvsaridhbppeolakquhamneffnfmbruivassdaaikxiaxupgdpgkfojvkkagcsmqnweofwikvevrsottkbtcldoruakajinnlgxmpddcrmohaktsdrxjelrbmfdthspikxeocqqdordrqwjtaxihswcubtfomksaxddcvtadnrtqkmdnacgduudtdbhsgpfomrdiaotcfwqlxccqeelgtnkflgixpjcriroruhbbgpidwkggdevpfratqebewaxcudseaikqjuuhpsguvtwxniofskkslfnrphatmxngneuituefcxufisrsjitqxwufrgidbwlmkrqojpwpljasaiukwwthrudhcocoguerakhajdncxbrnuavoqeuwsamwdqgutbaoixcgeibpoajhedooqcewiqvddedmanxljjjcbojgbmwabkfbvamgnfpncdcxoaqhmgurifpwpgrpctlqpwmqraknjltneknsphtwbnbiahknxipsovljkivlpggvldeveeopvoqlvfjbratadttlcecomllpkdgiloeedquivsnmxkfcvrkwaohgbrbvjklkktgwtlfgafqgbigheajrvffvvkkmibcedfmnwasopoqgxjohjoqnijeaifuwiwmogkwqlfmibuwecvnulvhkbsukscqlqlsxjulillmlgjkrbmllcunhbqmbujftqgkpwkvemthigednfohxpsduotwfnknfjbexflcfieaosnlhndsorbkcdlahovwbccshmrlcofowrmqajluiqaarnqtxokbaddswftiexiahmstpbonwmhvqgcpmfrocvtwfhjrtsupscfmvwfvaoolanrlgdsvgoseltdnoxrdglockhwlvffaakgrxjfnfbxnbprfvpwmexnhfekjnkenbohhmwlqoteiwgtjsrnceptbgwkfcmtkliwwqskmsoihmnbjsvnmfkwbwemijdtpnajgrousbrdaagenqlgeaiixfgcbfhceaxkwxbpksfouuqcvcerqecpdtvtsubbadmaatdnmnqhladeiapejkxffoagbwqbvppssvvvhlvhntatxlvqgjxbejpvxemqbdjknuogumrwbognklmvjsldrktpeowiuaapbjgktxwfjiferxgmafbcerteqlvpqvxbgdwiufdctkwptadtujmifppudubpmdtiedmqhnihquansnjufpbuumhhmidphkwusjdsdaocavtauhsvtgcoqhufmacwcbxvjmagkounkoqpcnoanhgwsjvgtlwgvbpdbufekosgagfsmadmvbonkrtcbspoabugkcjeebqhqwfjcqlqjvabaqecofgwskqplgup"
```

总的来说，这是一个愚蠢的错误，但对于我这样的菜鸡来说，也是一个容易忽视的错误，刚开始发现时也确实是比较困惑的，所以特此记录一下。



<Vssue :title="$title" />