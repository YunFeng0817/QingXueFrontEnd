if($args.Length -ne 2 -and $args.Length -ne 3){
    Write-Output "usage: [path] (the absolute path of the django project) | [mode](push or pull) | [message](if second parameter is push ,add the git commit message)"
}
else{
    Write-Output `n;
    if($args[0][-1] -ne '/' -or $args[0][-1] -ne '\'){
        $args[0] = $args[0]+"\";
    }
    $dest_path = $args[0];
    Set-Location $dest_path;
    if ( $args[1] -eq "pull" ){
        if((Test-Path $dest_path"init\staticcopy") ){
            $path = $dest_path + "init\staticcopy";
            $copy = "staticcopy";
            Remove-Item $dest_path"init/static" -recurse;
            Copy-Item -Path $dest_path"init\staticcopy/static" -Destination $dest_path"init" -recurse;
            Write-Host -NoNewline "Replace the changed "($copy).Substring(0,6)" file with its origin backup file $copy in $path";
            Write-Output `n;
            Remove-Item $path -recurse;
            Write-Output "Delete the backup file $copy in $path";
            Write-Output `n;
        }
        if ((Test-Path $dest_path"init\templates\copy")){
            $path = $dest_path + "init\templates\copy";
            $copy = "index.html.copy";
            Remove-Item $dest_path"init\templates\index.html";
            Copy-Item $dest_path"init\templates\copy\index.html" $dest_path"init\templates";
            Write-Host -NoNewline "Replace the changed "($copy).Substring(0,10)" file with its origin backup file $copy in $path";
            Write-Output `n;
            Remove-Item $path -recurse;
            Write-Output "Delete the backup file $copy in $path";
            Write-Output `n;
        }
        if((Test-Path $dest_path"copy")){
            $path = $dest_path;
            $copy = "db.sqlite3.copy";
            Remove-Item $dest_path"db.sqlite3";
            Copy-Item $dest_path"\copy\db.sqlite3" $dest_path;
            Write-Host -NoNewline "Replace the changed "($copy).Substring(0,10)" file with its origin backup file $copy in $path";
            Write-Output `n;
            Remove-Item $path -recurse;
            Write-Output "Delete the backup file $copy in $path";
            Write-Output `n;
        }
        git pull origin develop;
    }
    elseif($args[1] -eq "push"){
        if((Test-Path $dest_path"init\staticcopy") ){
            $path = $dest_path + "init\staticcopy";
            $copy = "staticcopy";
            Remove-Item $path -recurse;
            Write-Output "Delete the backup file $copy in $path";
            Write-Output `n;
        }
        if ((Test-Path $dest_path"init\templates\copy")){
            $path = $dest_path + "init\templates\copy";
            $copy = "index.html";
            Remove-Item $path -recurse;
            Write-Output "Delete the backup file $copy in $path";
            Write-Output `n;
        }
        if((Test-Path $dest_path"copy")){
            $path = $dest_path;
            $copy = "db.sqlite3";
            Remove-Item $path -recurse;
            Write-Output "Delete the backup file $copy in $path";
            Write-Output `n;
    }
    git add ./init/static ./init/templates;
    git commit -m $args[2];
    git pull origin develop;
    git push origin develop;
    }
}